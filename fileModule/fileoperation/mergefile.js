const fs = require('fs');
const path = require('path');

const file1 = path.join(__dirname, "../const/data.json");
const file2 = path.join(__dirname, "../const/samp.txt");

// Modify readjsonfile to return a promise
const readjsonfile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(file1, "utf8", (err, data) => {
      if (err) {
        console.log("Error while reading the JSON file:", err);
        reject(err);  // Reject the promise if there's an error
      } else {
        resolve(data); // Resolve the promise with the data
      }
    });
  });
};

// Modify readtextfile to return a promise
const readtextfile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(file2, "utf8", (err, data) => {
      if (err) {
        console.log("Error while reading the text file:", err);
        reject(err);  // Reject the promise if there's an error
      } else {
        resolve(data); // Resolve the promise with the data
      }
    });
  });
};

// Merge files
const mergefile = async () => {
  const dir = path.join(__dirname, 'merge');
  const mergeFilePath = path.join(dir, 'samp.txt');

  try {
    // Wait for both file reads to finish
    const [data1, data2] = await Promise.all([readjsonfile(), readtextfile()]);

    const finalData = data1 + '\n' + data2;

    // Ensure the directory exists before writing the merged file
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });  // Use mkdirSync to create the directory synchronously
    }

    // Write the merged data to the new file
    fs.writeFile(mergeFilePath, finalData, 'utf8', (err) => {
      if (err) {
        console.log("Error while writing the merged file:", err);
      } else {
        console.log("Files merged successfully!");
      }
    });
  } catch (error) {
    console.log("Error during file merging:", error);
  }
};

mergefile();
