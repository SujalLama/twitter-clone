const mongoose = require('mongoose');

const connectDB = async () => {
    try {
     const conn = await mongoose.connect(process.env.MONGO_URI, {
         useCreateIndex: true,
         useFindAndModify: true,
         useNewUrlParser: true,
         useUnifiedTopology: true
     })
     console.log(`Db connected at ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;