const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "name is required"],
    minlength: [3, "name should not be less than 3 characters"],
    lowercase: true,
    trim: true,
    maxlength: [50, "name should not be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: [true, "Email already exists"],
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    maxlength: [50, "Email can not exceed 50 characters"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "password should be more than 8 characters"],
    trim: true,
  },
  resetToken: String,
  resetTokenExpiry: Date
});

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
}

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign({
    id: this._id.toString(),
    name: this.username
  }, process.env.SECRET_KEY);

  return token;
}

const User = mongoose.model("User", userSchema)

// Registration Joi validation
function reg_validate(body) {
  const schema = Joi.object({
    username: Joi.string().required().lowercase().trim().min(3).max(50).messages({
      "string.min": "name must be at least 3 characters",
    }),
    email: Joi.string().required().trim().email().max(50).messages({
      "string.email": "Invalid email",
      "string.max": "Email cannot exceed 50 characters",
    }),
      password: Joi.string().required().trim().min(8).max(50).messages({
          "string.min": "Password must be at least 8 characters long",
          "string.max": "Password cannot exceed 50 characters"
    })
  });
    
    return schema.validate(body)
}

// Login Joi validation
function log_validate(body) {
  const schema = Joi.object({
    email: Joi.string().required().email().trim().max(50).messages({
      "string.max": "Email cannot exceed 50 characters",
      "string.email": "Invalid email"
    }),
    password: Joi.string().required().trim().min(8).max(50).messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 50 characters"
    })
  });

  return schema.validate(body);
}

module.exports = {
    User,
    reg_validate,
    log_validate
}
