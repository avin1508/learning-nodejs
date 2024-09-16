const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


let items = [];

    app.get("/getApi", (req,res) =>{
        res.status(200).json({
            "message": "data retrived sucessfully",
            data: items
        })
    })

    app.post("/postApi", (req,res) =>{
        let item = req.body;
        let index  = items.push(item)
        res.status(200).json({
            "message": "data inserted",
            data: item,
            index: index
        })
    })

    app.put("/putApi/:index", (req, res) => {
        let index = parseInt(req.params.index, 10);
        if (index >= 0 && index < items.length) {
            items[index] = req.body;
            res.status(200).json({
                message: "Item updated successfully",
                data: items[index]
            });
        } else {
            res.status(404).json({
                message: "Item not found"
            });
        }
    });

    app.delete('/deleteApi/:index', (req, res) => {
        const index = parseInt(req.params.index, 10);
        if (index >= 0 && index < items.length) {
            items.splice(index, 1);
            res.status(204).end();
        } else {
            res.status(404).send('Item not found');
        }
    });


app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`)
})