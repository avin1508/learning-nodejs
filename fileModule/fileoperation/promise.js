const fs = require('fs').promises;
const path = require('path')

const path1 = path.join(__dirname, "../const/data.json");
const path2 = path.join(__dirname, "../const/samp.txt");


const mergefiledata = async () =>{
   try {
    const [data1, data2] = await Promise.all([
        fs.readFile(path1, 'utf8'),
        fs.readFile(path2, 'utf8')
    ])

    console.log(data1);
    console.log(data2)
   } catch (error) {
    console.log(error)
   }
}

mergefiledata()