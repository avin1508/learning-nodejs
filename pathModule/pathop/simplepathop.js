const { error } = require('console');
const fs  = require('fs');
const path = require('path')

const filePath = path.join(__dirname, 'folder', 'sample.txt');

const data = "my name is avinash kumar what is you name";

const writeFile = () =>{
    const dir = path.dirname(filePath);

    fs.mkdir(dir, {recursive: true}, (error) =>{
        if(error){
            console.log(error)
        }else{
            fs.writeFile(filePath, data, 'utf8', (error) =>{
                if(error){
                    console.log("error while writing in the file")
                }else{
                    console.log("data writte sucessfully insid the file")
                }
            })
        }
    })
}

writeFile()

// path.join(): Different path segments ko combine karta hai into a single path.
// path.resolve(): Absolute path return karta hai based on the current working directory.
// path.basename(): File ka naam return karta hai.
// path.dirname(): File ki directory return karta hai.
// path.extname(): File ka extension return karta hai.