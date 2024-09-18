const fs = require('fs');
const path = require('path');

const folderpath = path.join(__dirname, "../folder");
console.log(folderpath)

const organizeFileByExtension = () => {

    const files = fs.readdirSync(folderpath);

    files.array.forEach(file => {
        const extensionname = path.extname(file);
        if(extensionname){
            const extensionFolder = path.join(folderpath, extensionname.slice(1)+'files')
            
            if(!fs.existsSync(extensionFolder)){
                fs.mkdirSync(extensionFolder)
                
            }

            const oldPath = path.join(folderpath, file)
            const newPath = path.join(folderpath, file)
            fs.renameSync(oldPath,newPath)

        }
    });
    console.log('files organized successfully')
}

organizeFileByExtension()