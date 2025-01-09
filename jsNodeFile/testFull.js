const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');

// Main entry function to process the contract with LLM
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
        console.error('Error in contract processing:', error.message);
        throw error;
    }
}

// Function to process contract sections using the LLM
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

// Function to extract variables from content
function extractVariables(content) {
    const variables = [...content.matchAll(/{{[^{}]*}}/g)].map(match => match[0]);
    return variables.join(', ');
}

// Mock LLM call - Replace with actual LLM integration
async function callLLM(prompt) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set. Please configure it in your environment.');
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: `You are a contract processing assistant. Modify variables and surrounding text as necessary to maintain logical consistency. Preserve all HTML structure.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.3,
            max_tokens: 2000
        });

        const processedContent = response.choices[0]?.message?.content || '';
        
        if (!validateProcessedContent(processedContent)) {
            throw new Error('LLM response validation failed. The HTML structure might have been altered.');
        }

        return processedContent;

    } catch (error) {
        console.error('Error calling LLM:', error.message);
        throw error;
    }
}

// Function to validate processed HTML content
function validateProcessedContent(content) {
    const originalTags = content.match(/<[^>]+>/g) || [];
    const processedTags = content.match(/<[^>]+>/g) || [];

    if (originalTags.length !== processedTags.length) {
        return false;
    }

    return originalTags.every((tag, index) => tag === processedTags[index]);
}

// Function to validate and reconstruct the HTML
async function reconstructHtml(input) {
    try {
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

        const validationResult = validateReconstructedHtml(htmlContent);
        if (!validationResult.isValid) {
            console.warn('\nWarning in reconstructed HTML:', validationResult.message);
        }

        return validationResult.isValid ? htmlContent : null;

    } catch (error) {
        console.error('Error reconstructing HTML:', error.message);
        throw error;
    }
}

// Function to validate the reconstructed HTML
function validateReconstructedHtml(html) {
    const validation = {
        isValid: true,
        message: ''
    };

    if (!html.includes('<!DOCTYPE html>')) {
        validation.isValid = false;
        validation.message += 'Missing DOCTYPE declaration. ';
    }

    const criticalTags = ['html', 'head', 'body'];
    criticalTags.forEach(tag => {
        if (!html.includes(`<${tag}`) || !html.includes(`</${tag}>`)) {
            validation.isValid = false;
            validation.message += `Missing ${tag} tag. `;
        }
    });

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

// Function to process the contract and extract sections into JSON
async function processContract(filePath) {
    try {
        const htmlString = await fs.readFile(filePath, 'utf8');
        const sections = parseContractSections(htmlString);

        const outputPath = path.join(
            path.dirname(filePath),
            `${path.basename(filePath, '.html')}_sections.json`
        );

        await fs.writeFile(outputPath, JSON.stringify(sections, null, 2));

        console.log(`\nProcessed ${path.basename(filePath)} successfully!`);
        return sections;

    } catch (error) {
        console.error('Error processing file:', error.message);
        throw error;
    }
}

// Function to parse HTML sections into a structured JSON
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

    sections.metadata.totalSections = Object.keys(sections.sections).length;
    sections.metadata.sectionsWithVariables = Object.values(sections.sections)
        .filter(section => section.hasVariables).length;

    return sections;
}

// Example usage
const contractPath = './Supply Agreement.html';
processContractWithLLM(contractPath)
    .then(finalHtml => {
        console.log('Contract processed successfully');
    })
    .catch(console.error);
