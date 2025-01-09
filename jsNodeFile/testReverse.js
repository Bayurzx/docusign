const fs = require('fs').promises;
const path = require('path');

async function reconstructHtml(jsonFilePath) {
   try {
       // Read the JSON file
       const sectionsData = JSON.parse(await fs.readFile(jsonFilePath, 'utf8'));
       
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

       // Save reconstructed HTML
       const outputPath = path.join(
           path.dirname(jsonFilePath),
           `reconstructed_${path.basename(jsonFilePath, '_sections.json')}.html`
       );
       
       await fs.writeFile(outputPath, htmlContent);
       
       // Validate HTML structure
       const validationResult = validateReconstructedHtml(htmlContent);
       if (!validationResult.isValid) {
           console.warn('\nWarning:', validationResult.message);
       }

       console.log(`\nHTML reconstructed successfully! Saved to: ${outputPath}`);
       return htmlContent;

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

// Example usage:
const jsonPath = path.resolve('./Supply Agreement_sections.json');
reconstructHtml(jsonPath)
   .catch(err => console.error('Failed to reconstruct HTML:', err));

// Optional: Function to process multiple JSON files
async function reconstructAllHtml(dirPath) {
   const files = await fs.readdir(dirPath);
   const jsonFiles = files.filter(file => 
       file.endsWith('_sections.json')
   );
   
   for (const file of jsonFiles) {
       await reconstructHtml(path.join(dirPath, file));
   }
}