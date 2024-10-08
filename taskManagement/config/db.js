const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const URL = process.env.MONGO_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to the database:", error);
    }
}

module.exports = connectDb;
