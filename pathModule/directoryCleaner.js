// const fs = require('fs');
// const path = require('path');

// const ten_days  = 24*60*60*1000;

// const inputPath = path.join(__dirname, 'texts');

// const clearDir = async () =>{
//     try {
//         const files = await fs.promises.readdir(inputPath);

//         for (const file of files) {
//             const filePath = path.join(inputPath, file);
//             const fileStats = await fs.promises.stat(filePath); 

//             const currentDate = new Date().getTime();
//             const modifiedTime = new Date(fileStats.mtime).getTime();

//             if(currentDate - modifiedTime > ten_days){
//                 await fs.promises.unlink(filePath);
//                 console.log(`Deleted old fiiles: ${file}`)
//             }
//         }

//     } catch (error) {
//        console.error('error while cleaning files:', error);
//     }
// }

// clearDir();


const prmise1 = new Promise((resolve,reject) =>{
    setTimeout(() => resolve("promise 1 resolved"),2000)
});

const promise2 = new Promise((resolve,reject) =>{
    setTimeout(() => resolve("promise 2 resolve"),3000)
})

const promise3 = new Promise((resolve,reject) =>{
    setTimeout(() => resolve("promise 3 resolved"),4000)
})


Promise.all([prmise1,promise2,promise3])
     .then(results =>{
        console.log("promise.all results",results)
     })
     .catch(err =>{
        console.log(err)
     })