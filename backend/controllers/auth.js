const User = require('../models/user.model');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const upload = require('../middleware/fileUpload');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
        const {username, email, password, firstname, lastname} = req.body;

        //Create user
        const user = await User.create({
            username,
            email,
            password,
            firstname,
            lastname
        })

        sendTokenResponse(user, 200, res);
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
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
})

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    
    if(!user) {
        return res.status(404).json({message: 'There is no user with that email'})
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you  (or someone else) has requested of a password.
                    Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })

        res.status(200).json({success: true, data: 'Email sent'});
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return res.json('Email could not be send');
    }

    res.status(200).json({
        success: true,
        data: user
    }) 
})

// @desc    Reset password
// @route   POST /api/v1/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
        const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        });

        if(!user) {
            return res.status(400).json('Invalid token');
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendTokenResponse(user, 200, res);
})

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
        const fieldsToUpdate = {
            username: req.body.username,
            address: req.body.address,
            bio: req.body.bio
        }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    
    // check current password
    if(!(await user.matchPassword(req.body.currentPassword))) {
        return res.status(401).json('password is incorrect');
    }

    user.password = req.body.newPassword;
    await user.save();

   sendTokenResponse(user, 200, res);
})

exports.uploadProfilePic = asyncHandler(async (req, res) => {
    // console.log(req.file);
    // if (req.file == undefined) {
    //   return res.status(400).send({ message: "Choose a file to upload" });
    // }
  
    await upload(req, res);
   await User.findByIdAndUpdate(req.user.id, {
       profilePhoto: req.file.originalname
   })

    res.status(200).send({
      message: "File uploaded successfully: " + req.file.originalname,
    });
});

exports.uploadCoverPic = asyncHandler(async (req, res) => {
    // console.log(req.file);
    // if (req.file == undefined) {
    //   return res.status(400).send({ message: "Choose a file to upload" });
    // }
  
    await upload(req, res);
   await User.findByIdAndUpdate(req.user.id, {
       coverPhoto: req.file.originalname
   })

    res.status(200).send({
      message: "File uploaded successfully: " + req.file.originalname,
    });
});

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

// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Public

exports.getAllUsers = asyncHandler(async (req, res, next) => {
        const keyword = req.query.keyword ? {
            username: {
                $regex: req.query.keyword,
                $options: 'i' //case insensitive
            }
        } : {}
    
        const users = await User.find({...keyword});
        return (  res.status(200).json({
        success: true,
        data: users,
        }))
})

// @desc    Get single user
// @route   GET /api/v1/auth/users/:id
// @access  Public

exports.getSingleUser = asyncHandler(async (req, res, next) => {   
        const user = await User.findById(req.params.id).populate('posts');
        return (  res.status(200).json({
        success: true,
        data: user,
        }))
})