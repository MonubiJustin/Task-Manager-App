const asyncMiddleware = require("../middleware/async");
const { reg_validate, log_validate, User } = require("../models/User");

//@desc Register user
//@route POST /api/v1/users/register
//@access public
exports.registerUser = asyncMiddleware(async (req, res) => {
  console.log("Post route hit");
  const { error } = reg_validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // check if user is already registerd
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).json({msg: "Email already exists"});

  user = new User(req.body);
  await user.save();

  const token = user.genAuthToken();
  res
    .header("x-auth-token", token)
    .status(201)
    .json({ msg: "User registered successfully", user: user });
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

  const isValid = await user.isValidPassword(password)
  console.log(isValid);
  if (!isValid)
    return res.status(401).json("Invalid email or password");

  const token = user.genAuthToken();
  res.status(200).json({ msg: "User logged in successfully", token: token });
});

//@desc Info of logged in user
//@route GET /api/v1/users/me
//@access private
exports.currentUser = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user.id).select("username email");
  res.status(200).json({ user: user });
});
