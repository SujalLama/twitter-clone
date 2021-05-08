const express = require('express');
const cookie = require('cookie-parser');
const dotenv = require('dotenv').config({path: './config/config.env'});
const connectDB = require('./config/db');

//routes
const authRoute = require('./routes/auth');

// Creating server instance
const app = express();

//connecting db
connectDB();

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookie());

//routes
app.use('/api/v1/auth', authRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in port: ${PORT} in ${process.env.NODE_ENV}`))