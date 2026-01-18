const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://riyarani23:DevMesh12345@web-cluster23.qihgb1i.mongodb.net/DEVTINDER?retryWrites=true&w=majority"
    );
};

    module.exports = connectDB;