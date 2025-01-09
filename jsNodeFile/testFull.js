const fs = require('fs').promises;
const path = require('path');

async function processContract(filePath) {
   try {
       // Read the HTML file
       const htmlString = await fs.readFile(filePath, 'utf8');
       
       // Parse sections
       const sections = parseContractSections(htmlString);
       
       // Save the result to a JSON file
       const outputPath = path.join(
           path.dirname(filePath), 
           `${path.basename(filePath, '.html')}_sections.json`
       );
       
       await fs.writeFile(outputPath, JSON.stringify(sections, null, 2));
       
       // Validate the sections
       validateSections(htmlString, sections);
       
       console.log(`\nProcessed ${path.basename(filePath)} successfully!`);
       console.log('Sections with variables:');
       Object.entries(sections.sections)
           .filter(([_, section]) => section.hasVariables)
           .forEach(([key, _]) => console.log(`- ${key}`));
           
       return sections;

   } catch (error) {
       console.error('Error processing file:', error.message);
       throw error;
   }
}

function parseContractSections(htmlString) {
    const sectionRegex = /<!-- SECTION: (.*?) -->([\s\S]*?)<!-- END_SECTION: \w+ -->/g;
    
    const sections = {
        sections: {},
        metadata: {
            totalSections: 0,
            sectionsWithVariables: 0,
            created: new Date().toISOString()
        }
    };
 
    let match;
    while ((match = sectionRegex.exec(htmlString)) !== null) {
        const [_, metadataStr, content] = match;
        const metadata = JSON.parse(metadataStr);
        
        sections.sections[metadata.key] = {
            content: content.trim(),
            processed: false,
            ...metadata
        };
    }
 
    // Update metadata
    sections.metadata.totalSections = Object.keys(sections.sections).length;
    sections.metadata.sectionsWithVariables = Object.values(sections.sections)
        .filter(section => section.hasVariables).length;
 
    return sections;
 }

 function validateSections(htmlString, sections) {
    // Check if any content exists outside sections
    let remainingHtml = htmlString;
    Object.values(sections.sections).forEach(section => {
        remainingHtml = remainingHtml.replace(section.content.trim(), '');
    });
 
    // Remove all section comments
    remainingHtml = remainingHtml.replace(/<!-- SECTION:.*?END_SECTION: \w+ -->/gs, '');
    
    // Check for remaining meaningful content
    const meaningfulContent = remainingHtml.replace(/[\s\n]/g, '');
    if (meaningfulContent.length > 0) {
        console.warn('\nWarning: Found content outside of sections:', meaningfulContent);
    }
 
    // Verify section order continuity
    const orders = Object.values(sections.sections)
        .map(section => section.order)
        .sort((a, b) => a - b);
    
    for (let i = 1; i < orders.length; i++) {
        if (orders[i] !== orders[i-1] + 1) {
            console.warn(`\nWarning: Non-sequential order numbers found: ${orders[i-1]} -> ${orders[i]}`);
        }
    }
 }

 async function reconstructHtml(input) {
    try {
        // Handle either file path or direct JSON object
        const sectionsData = typeof input === 'string' 
            ? JSON.parse(await fs.readFile(input, 'utf8'))
            : input;
        
        // Sort sections by order
        const orderedSections = Object.values(sectionsData.sections)
            .sort((a, b) => a.order - b.order);
 
        // Reconstruct HTML
        let htmlContent = '';
        orderedSections.forEach(section => {
            htmlContent += `<!-- SECTION: ${JSON.stringify({
                key: section.key,
                order: section.order,
                type: section.type,
                hasVariables: section.hasVariables
            })} -->\n`;
            htmlContent += section.content + '\n';
            htmlContent += `<!-- END_SECTION: ${section.key} -->\n\n`;
        });
 
        // Validate reconstructed HTML
        const validationResult = validateReconstructedHtml(htmlContent);
        if (!validationResult.isValid) {
            console.warn('\nWarning in reconstructed HTML:', validationResult.message);
        }
 
        // If input was a file path, save the output
        if (typeof input === 'string') {
            const outputPath = path.join(
                path.dirname(input),
                `reconstructed_${path.basename(input, '_sections.json')}.html`
            );
            
            // Only save if validation passed
            if (validationResult.isValid) {
                await fs.writeFile(outputPath, htmlContent);
                console.log(`\nHTML reconstructed successfully! Saved to: ${outputPath}`);
            } else {
                throw new Error(`HTML validation failed: ${validationResult.message}`);
            }
        }
 
        return validationResult.isValid ? htmlContent : null;
 
    } catch (error) {
        console.error('Error reconstructing HTML:', error.message);
        throw error;
    }
 }
 
 function validateReconstructedHtml(html) {
    const validation = {
        isValid: true,
        message: ''
    };
 
    // Basic structure checks
    if (!html.includes('<!DOCTYPE html>')) {
        validation.isValid = false;
        validation.message += 'Missing DOCTYPE declaration. ';
    }
 
    // Check for opening and closing tags
    const criticalTags = ['html', 'head', 'body'];
    criticalTags.forEach(tag => {
        if (!html.includes(`<${tag}`) || !html.includes(`</${tag}>`)) {
            validation.isValid = false;
            validation.message += `Missing ${tag} tag. `;
        }
    });
 
    // Check section continuity
    const sectionRegex = /<!-- SECTION: (.*?) -->/g;
    let match;
    let previousOrder = 0;
    
    while ((match = sectionRegex.exec(html)) !== null) {
        const metadata = JSON.parse(match[1]);
        if (metadata.order <= previousOrder && previousOrder !== 0) {
            validation.isValid = false;
            validation.message += `Invalid section order at section ${metadata.key}. `;
        }
        previousOrder = metadata.order;
    }
 
    return validation;
 }
 

async function processContractWithLLM(htmlPath) {
    try {
        // 1. Convert HTML to JSON
        const sections = await processContract(htmlPath);
        
        // 2. Filter sections that need LLM processing
        const variableSections = {};
        const staticSections = {};
        
        Object.entries(sections.sections).forEach(([key, section]) => {
            if (section.hasVariables) {
                variableSections[key] = section;
            } else {
                staticSections[key] = section;
            }
        });

        // 3. Process variable sections with LLM
        const processedSections = await processWithLLM(variableSections);

        // 4. Merge back with static sections
        const completeProcessedSections = {
            sections: {
                ...staticSections,
                ...processedSections
            },
            metadata: sections.metadata
        };

        // 5. Convert back to HTML
        return await reconstructHtml(completeProcessedSections);

    } catch (error) {
        console.error('Error in contract processing:', error);
        throw error;
    }
}

async function processWithLLM(variableSections) {
    const processedSections = {};
    
    // Create context from all variable sections
    const contextPrompt = `You are processing a legal contract. 
    You will receive sections containing variables marked with {{variable}}.
    IMPORTANT: 
    - Only modify content within {{...}} and minimal surrounding text for context
    - Maintain all HTML structure exactly
    - Ensure changes are consistent across all sections
    - Keep all legal language intact except where variables are replaced
    
    Current contract sections context:
    ${Object.values(variableSections)
        .map(section => `${section.key}: ${extractVariables(section.content)}`)
        .join('\n')}`;

    // Process each section while maintaining context
    for (const [key, section] of Object.entries(variableSections)) {
        const sectionPrompt = `
        ${contextPrompt}
        
        CURRENT SECTION TO PROCESS:
        ${section.content}
        
        Replace variables with appropriate content. Maintain exact HTML structure.
        `;

        // Call to LLM API here
        const processedContent = await callLLM(sectionPrompt);
        
        processedSections[key] = {
            ...section,
            content: processedContent,
            processed: true
        };
    }

    return processedSections;
}

function extractVariables(content) {
    const variables = content.match(/{{[^}]+}}/g) || [];
    return variables.join(', ');
}

// Mock LLM call - Replace with actual LLM integration
const OpenAI = require('openai');

async function callLLM(prompt) {
   try {
       const openai = new OpenAI({
           apiKey: process.env.OPENAI_API_KEY 
       });

       const response = await openai.chat.completions.create({
           model: "gpt-4",
           messages: [
               {
                   role: "system",
                   content: `You are a contract processing assistant that only modifies variables and minimal surrounding text 
                   in contract sections while preserving exact HTML structure. Your changes must be logically consistent 
                   across sections. Never remove or modify HTML tags or structure.`
               },
               {
                   role: "user", 
                   content: prompt
               }
           ],
           temperature: 0.3, // Lower temperature for more consistent outputs
           max_tokens: 2000,
       });

       // Extract the processed content
       const processedContent = response.choices[0].message.content;

       // Validate the response maintains HTML structure
       if (!validateProcessedContent(processedContent)) {
           throw new Error('LLM response validation failed - HTML structure modified');
       }

       return processedContent;

   } catch (error) {
       console.error('Error calling LLM:', error);
       throw error;
   }
}

function validateProcessedContent(content) {
   // Basic validation to ensure HTML structure is maintained
   const originalTags = content.match(/<[^>]+>/g) || [];
   const processedTags = content.match(/<[^>]+>/g) || [];

   // Check if number and order of HTML tags matches
   if (originalTags.length !== processedTags.length) {
       return false;
   }

   // Check if all tags are identical and in same order
   return originalTags.every((tag, index) => tag === processedTags[index]);
}

// Error handling wrapper if needed
async function callLLMWithRetry(prompt, maxRetries = 3) {
   for (let i = 0; i < maxRetries; i++) {
       try {
           return await callLLM(prompt);
       } catch (error) {
           if (i === maxRetries - 1) throw error;
           console.warn(`Retry ${i + 1}/${maxRetries} after error:`, error.message);
           await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
       }
   }
}

// Example usage
const contractPath = './Supply Agreement.html';
processContractWithLLM(contractPath)
    .then(finalHtml => {
        console.log('Contract processed successfully');
    })
    .catch(console.error);