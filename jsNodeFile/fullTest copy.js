const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');

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

        // 5. Convert back to HTML directly with the object
        return await reconstructHtml(completeProcessedSections);

    } catch (error) {
        console.error('Error in contract processing:', error);
        throw error;
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

        // If input was a file path, save the output
        if (typeof input === 'string') {
            const outputPath = path.join(
                path.dirname(input),
                `reconstructed_${path.basename(input, '_sections.json')}.html`
            );
            await fs.writeFile(outputPath, htmlContent);
            console.log(`\nHTML reconstructed successfully! Saved to: ${outputPath}`);
        }

        return htmlContent;

    } catch (error) {
        console.error('Error reconstructing HTML:', error.message);
        throw error;
    }
}

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
            temperature: 0.3,
            max_tokens: 2000,
        });

        const processedContent = response.choices[0].message.content;

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
    const originalTags = content.match(/<[^>]+>/g) || [];
    const processedTags = content.match(/<[^>]+>/g) || [];

    if (originalTags.length !== processedTags.length) {
        return false;
    }

    return originalTags.every((tag, index) => tag === processedTags[index]);
}

// Usage example
const contractPath = './contract.html';
processContractWithLLM(contractPath)
    .then(finalHtml => {
        // Save the final HTML if needed
        fs.writeFile('./processed_contract.html', finalHtml);
        console.log('Contract processed successfully');
    })
    .catch(console.error);