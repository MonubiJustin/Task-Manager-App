const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name is required'],
        minlength: [3, 'name should not be less than 3 characters'],
        lowercase: true,
        trim: true,
        maxlength: [50, 'name should not be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'password should be more than 8 characters'],
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);