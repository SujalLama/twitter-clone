const express = require('express');
const cookie = require('cookie-parser');
const dotenv = require('dotenv').config({path: './config/config.env'});
const connectDB = require('./config/db');
const cors = require('cors');

//routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const uploadRoutes = require("./routes/upload.route");


// Creating server instance
const app = express();

global.__basedir = __dirname;

let corsConfig = {
    origin: "http://localhost:5000"
};

app.use(cors(corsConfig));





//connecting db
connectDB();

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookie());

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/', uploadRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in port: ${PORT} in ${process.env.NODE_ENV}`))