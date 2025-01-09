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

// Example usage:
const filePath = path.resolve('./Supply Agreement.html');
processContract(filePath)
   .catch(err => console.error('Failed to process file:', err));

// To process multiple files later:
/*
async function processDirectory(dirPath) {
   const files = await fs.readdir(dirPath);
   const htmlFiles = files.filter(file => path.extname(file) === '.html');
   
   for (const file of htmlFiles) {
       await processContract(path.join(dirPath, file));
   }
}
*/