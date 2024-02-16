const mongoose = require('mongoose');
const colors = require('colors');

const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to Mongodb Database'.bgGreen.bgWhite)
    } catch (error) {
        console.log(`Error in mongoDB ${error}`.bgRed.bgWhite);
    }
}

module.exports = mongoDB;