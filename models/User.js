const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  resetTokenExpiry: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genAuthToken = function () {
  return jwt.sign(
    {
      id: this._id.toString(),
      name: this.username,
    },
    process.env.SECRET_KEY
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
