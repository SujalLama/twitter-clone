const express = require('express');
const dotenv = require('dotenv').config({path: './config/config.env'});
const connectDB = require('./config/db');

// Creating server instance
const app = express();
//connecting db
connectDB();

//routes
app.get('/', (req, res) => {
    res.send('hello world');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in port: ${PORT} in ${process.env.DEV_MODE}`))