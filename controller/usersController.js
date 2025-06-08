const asyncMiddleware = require("../middleware/async");
const User = require('../models/User');
const bcrypt = require('bcrypt');

//@desc Register user
//@route POST /api/v1/users/register
//@access public
exports.registerUser = asyncMiddleware(async (req, res) => {
  console.log("Register route hit"); // Debugging
    const { name, email, password } = req.body;

    // check if user is already registerd
    let user = await User.findOne({ email });
    if (user) return res.json( 'Invalid email or password' );

    user = new  User(req.body);
  const salt = await bcrypt.genSalt(10);
  console.log(password);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    console.log("Response sent:", { user: { name: user.name }, msg: "User registered successfully" });
    res.status(201).json({ user: { name: user.name }, msg: "User registered successfully" })

});

//@desc Login User
//@route POST /api/v1/users/login
//@access public
exports.loginUser = asyncMiddleware(async (req, res) => {
  res.json("User logged in");
});
