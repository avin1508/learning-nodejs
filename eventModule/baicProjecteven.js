const fs = require('fs').promises;
const path = require('path');
const EventEmitter = require('events');

const inputPath = path.join(__dirname, 'fileOp', 'input.txt');
const outputPath = path.join(__dirname, 'fileOp', 'output.txt');

const eventEmitter = new EventEmitter();

eventEmitter.on('readfile', async () =>{
   try {
    const data = await fs.readFile(inputPath, 'utf-8');
    console.log('file dta readed sucessfully!!');

    eventEmitter.emit('processData', data);
   } catch (error) {
    console.error("error while reading the file", error);
   }
})

eventEmitter.on('processData', (data) =>{
    if(!data){
        console.error('data not found');
        return;
    }

    const processData = data.toUpperCase();
    console.log('file content process Sucessfully');
    eventEmitter.emit('saveFile', processData);
});

eventEmitter.on('saveFile', async (data) =>{
    try {
        const dir = path.dirname(outputPath);
        try {
            await fs.access(dir);
            console.log('directory exist')
        } catch (error) {
            console.log('directory not exist creating the directory')
            await fs.mkdir(dir, { recursive: true });
        }
        await fs.writeFile(outputPath, data);
        console.log('processed content saved sucessfully !!')
    } catch (error) {
        console.error("occured some error while saving the updated data",error)
    }
})

const main = async () =>{
    try {
        await fs.access(inputPath);
        eventEmitter.emit('readfile')
    } catch (error) {
        
    }
}

main()