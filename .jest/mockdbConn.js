const mongoose = require("mongoose");

const connectDB = async () => {
    // const uri = 'mongodb://localhost:27017/testdb';
    const uri = 'mongodb://root:root@mongo:27017/?authSource=admin';
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error);
    }
};

const dropDB = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};

module.exports = { connectDB, dropDB }