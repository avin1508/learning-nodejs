const express = require('express');
const app = express();


const requestLimit = 10;
const timeWindow = 60000;
const userRequest = {};


app.get("/getInfo", (req,res) =>{
    const user = req.ip;

    if(!userRequest[user]){
        userRequest[user] = { count: 1, startTime: Date.now()};   
    }else{
        const currentTime = Date.now();
        const timeLap = currentTime - userRequest[user].startTime;

        if(timeLap < timeWindow){
            userRequest[user].count += 1;
            

            if(userRequest[user].count > requestLimit){
                return res.status(429).json({error: 'Rate limit exceeded'})
            }

        }else{
            userRequest[user].count = 1;
            userRequest[user].startTime = currentTime;
        }
    }

    res.send("Request successful!")
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
})