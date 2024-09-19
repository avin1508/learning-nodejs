//this is sync
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

//this is async 
const folderpaths = path.join(__dirname, 'folder');
console.log('Constructed folder path:', folderpaths);

const organizeFileByExtensionasync = async () => {
    try {
        try {
            await fs.access(folderpaths);
        } catch (error) {
            console.error('Directory does not exist:', folderpaths);
            return;
        }
        const files = await fs.readdir(folderpaths);
        await Promise.all(files.map(async (file) => {
            const extensionname = path.extname(file);
            if (extensionname) {
                const extensionFolder = path.join(folderpaths, extensionname.slice(1) + 'Files');
                try {
                    await fs.access(extensionFolder);
                } catch (error) {
                    await fs.mkdir(extensionFolder, { recursive: true });
                }
                const oldPath = path.join(folderpaths, file);
                const newPath = path.join(extensionFolder, file);
                await fs.rename(oldPath, newPath);
            }
        }));
        console.log('Files organized successfully');
    } catch (error) {
        console.error('Error organizing files:', error);
    }
}

organizeFileByExtensionasync();
