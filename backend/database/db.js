const mongoose = require('mongoose');

// connect to mongodb
const connectDB = async () => {
    await mongoose
        .connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => console.log('mongodb is connected ...'))
        .catch(err => console.log('mongodb error', err));
};

module.exports = connectDB;
