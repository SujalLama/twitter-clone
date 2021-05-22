const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message;
    // Log to console for dev
    console.log(err.stack);

    // Mongoose bad ObjectId
    if(err.name === 'CastError') {
        const message = `Posts not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate keys
    if(err.code === 11000) {
        const message = 'Duplicate field value entered'
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation errors
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400)
    }

     if (err.code == "LIMIT_FILE_SIZE") {
         const message = "File size should be less than 5MB";
         error = new ErrorResponse(message, 500)
     }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;