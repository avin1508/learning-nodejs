const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const userRouter = require('./routes/userROutes');
const taskRouter = require('./routes/taskROutes');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
connectDb();

// Middleware for parsing JSON requests
app.use(express.json()); 

app.use('/api', userRouter);
app.use('/api', taskRouter);

app.listen(PORT, () => { // Pass the PORT to app.listen
    console.log(`Server is started at port ${PORT}`);
});
