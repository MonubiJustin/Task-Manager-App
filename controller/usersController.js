const asyncMiddleware = require("../middleware/async");
const bcrypt = require("bcrypt");
const { reg_validate, log_validate, User } = require("../models/User");

//@desc Register user
//@route POST /api/v1/users/register
//@access public
exports.registerUser = asyncMiddleware(async (req, res) => {
  console.log("Post route hit")
  const { error } = reg_validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // check if user is already registerd
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).json("Email already exists");

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  res.status(201).json("User registered successfully");
});

//@desc Login User
//@route POST /api/v1/users/login
//@access public
exports.loginUser = asyncMiddleware(async (req, res) => {
  const { error } = log_validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);


  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json("Invalid email or password");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json("Invalid email or password");

  res.status(200).json("User logged in successfully");
});
