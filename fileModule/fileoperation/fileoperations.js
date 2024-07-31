const fs = require('fs');
const path = require('path');

const subpath = '../const/samp.txt';
const fullPath = path.join(__dirname, subpath);

const readFile = (callback) => {
  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    callback(data);
  });
};

const writeFile = (data, callback) => {
  fs.writeFile(fullPath, data, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    callback();
  });
};


const appendToFile = (newEntry, callback) => {
  fs.appendFile(fullPath, newEntry, 'utf8', (err) => {
    if (err) {
      console.error('Error appending file:', err);
      return;
    }
    callback();
  });
};

// Delete file
const deleteFile = (callback) => {
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return;
    }
    callback();
  });
};

module.exports = {
  readFile,
  writeFile,
  appendToFile,
  deleteFile
};
