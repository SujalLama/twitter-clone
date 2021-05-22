const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: 'firstname is required'
    },
    lastname: {
        type: String,
        trim: true,
        required: 'lastname is required'
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required'
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'Email already exists'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
        'Please fill a valid email address'],
        required: 'Email is required'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    profilePhoto: {
        data: Buffer,
        contentType: String
    },
    coverPhoto: {
        data: Buffer,
        contentType: String
    },
    bio: {
        type: String,
        maxlength: 30,
    },
    address: {
        type: String,
        maxlength: 15,
    },
    followers: [{type:mongoose.Schema.ObjectId, ref: 'User'}],
    following: [{type:mongoose.Schema.ObjectId, ref: 'User'}],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
})

//Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{ 
        expiresIn: process.env.JWT_EXPIRE
    });
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generate and hash passwrod token
UserSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash token and set to resetPasswordToken filed
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // this is 60 seconds

    return resetToken;
}

module.exports = mongoose.model('User', UserSchema);
