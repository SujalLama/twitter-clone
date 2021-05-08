const User = require('../models/user.model');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;

        //Create user
        const user = await User.create({
            username,
            email,
            password
        })

        sendTokenResponse(user, 200, res);
   
    } catch (err) {
        res.status(400).json({err})
    }
}

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

    // Validate email and password
        if(!email || !password) {
            return res.status(400).json('Please provide an email or password')
        }
       
    // check for user
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return res.status(401).json('Invalid credentials')
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return res.status(401).json('Invalid credentials');
    }

    sendTokenResponse(user, 200, res);
   
    } catch (err) {
        res.status(400).json({err})
    }
}

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
        const token = user.getSignedJwtToken();
    
        const options = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        if(process.env.NODE_ENV === 'production') {
            options.secure = true
        }
        
        res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });

}