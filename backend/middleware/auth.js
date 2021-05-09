const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

//Protect routes

exports.protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') 
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    // else if (req.cookies.token) {
    //     token = req.cookies.token
    // }

    // Make sure token exist
    if(!token) {
        return next(res.status(401).json('Not authorize to access this route'));
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(res.status(401).json('Not authorize to access this route'));
    }
}
