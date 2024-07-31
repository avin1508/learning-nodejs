
const fileops = require('./fileoperation/fileoperations');

fileops.readFile((data) => {
  console.log('File contents:\n', data);
});

// 2. Create or overwrite file
const newData = `Name: New Person
Phone Number: 123-456-7890
Email: new.person@example.com`;

fileops.writeFile(newData, () => {
  console.log('File created/overwritten successfully.');

  // After writing, read it again
  fileops.readFile((data) => {
    console.log('Updated file contents:\n', data);
  });
});

// 3. Append to file
const newEntry = `Name: Another Person
Phone Number: 987-654-3210
Email: another.person@example.com
`;

fileops.appendToFile(newEntry, () => {
  console.log('New entry added successfully.');

  // After appending, read the updated file
  fileops.readFile((data) => {
    console.log('File contents after appending:\n', data);
  });
});

// 4. Delete file
fileops.deleteFile(() => {
  console.log('File deleted successfully.');
});



