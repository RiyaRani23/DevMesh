const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://riyarani23:Riya123@web-cluster23.qihgb1i.mongodb.net/DEVTINDER?appName=web-cluster23/"
    );
};

    module.exports = connectDB;