const fs = require('fs').promises;
const path = require('path');

const folderpath = path.join(__dirname, 'folder');
console.log('Constructed folder path:', folderpath);

const organizeFileByExtension = async () => {
    try {
        try {
            await fs.access(folderpath);
        } catch (error) {
            console.error('Directory does not exist:', folderpath);
            return;
        }
        const files = await fs.readdir(folderpath);
        await Promise.all(files.map(async (file) => {
            const extensionname = path.extname(file);
            if (extensionname) {
                const extensionFolder = path.join(folderpath, extensionname.slice(1) + 'Files');
                try {
                    await fs.access(extensionFolder);
                } catch (error) {
                    await fs.mkdir(extensionFolder, { recursive: true });
                }
                const oldPath = path.join(folderpath, file);
                const newPath = path.join(extensionFolder, file);
                await fs.rename(oldPath, newPath);
            }
        }));
        console.log('Files organized successfully');
    } catch (error) {
        console.error('Error organizing files:', error);
    }
}

organizeFileByExtension();
