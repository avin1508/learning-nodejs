const path = require('path');
const fs = require('fs'); 

const inputPath = path.join(__dirname, 'texts');
const outputPath = path.join(__dirname, 'combined', 'output.txt');

const combinedFile = () => {
    try {
        const files = fs.readdirSync(inputPath); 

        let combinedData = '';

        for (const file of files) {
            const filePath = path.join(inputPath, file);
            const data = fs.readFileSync(filePath, 'utf8'); 
            console.log(data);

            combinedData += data + '\n';
        }

        const combinedDir = path.dirname(outputPath);

        if (!fs.existsSync(combinedDir)) {
            fs.mkdirSync(combinedDir, { recursive: true }); 
        }

        console.log(outputPath);
        fs.writeFileSync(outputPath, combinedData, 'utf8'); 
        console.log('Files combined successfully');
    } catch (error) {
        console.log("Error:", error);
    }
};

combinedFile();
