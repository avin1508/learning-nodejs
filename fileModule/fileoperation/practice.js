const fs = require('fs');
const path = require('path');

const fullPath = path.join(__dirname, "../const/data.json");




const writeJsonFile = (data) =>{
    fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8',  (err) =>{
        if(err){
            console.log("error while writing", err);
            return;
        }
    })
}
data = {
    "users": [
      { "name": "John Doe", "age": 25 },
      { "name": "Jane Smith", "age": 30 },
      {name:"tarun"}
    ]
  }

  const readJsonFile = (callback) => {
    fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        callback(JSON.parse(data, {"address": "jhajha"}, 2));
    });
};

writeJsonFile(data)

readJsonFile(print)
function print(data){
console.log("this is the data", data)
}