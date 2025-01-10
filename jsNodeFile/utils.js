const fs = require('fs');

// Function to read a JSON file and get the value of a specific key
const filePath = './data.json';
function getValueFromJsonFile(filePath, key) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Parse the JSON data
    const jsonObj = JSON.parse(data);

    // Get the value of the key
    const value = jsonObj[key] || null;  // Returns null if the key doesn't exist
    console.log(value);
  });
}

// Export the function so it can be used in other files
module.exports = { getValueFromJsonFile };
