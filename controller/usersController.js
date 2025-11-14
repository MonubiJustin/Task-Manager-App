const asyncMiddleware = require("../middleware/async");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

//@desc Register user
//@route POST /api/v1/users/register
//@access public
exports.registerUser = asyncMiddleware(async (req, res) => {
  // check if user is already registerd
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });

  user = new User(req.body);
  await user.save();

  const token = user.genAuthToken();
  res.header("Authorization", `Bearer ${token}`).status(201).json({
    success: true,
    message: "User Registered successfully"
  });
});

//@desc Login User
//@route POST /api/v1/users/login
//@access public
exports.loginUser = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || (!await user.isValidPassword(password)))
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });

  const token = user.genAuthToken();
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: token,
  });
});

//@desc Info of logged in user
//@route GET /api/v1/users/me
//@access private
exports.currentUser = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user.id).select("username email");
  if (!user)
    return res.status(404).json({
      success: false,
      message: "User doesn't exist",
    });
  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc get all users
//@route GET /api/v1/users
//@access public
exports.getAllUsers = asyncMiddleware(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const users = await User.find()
    .limit(limit)
    .skip(offset)
    .select("-__v -password -resetToken -resetTokenExpiry");
  
  const total = await User.countDocuments();
  const totalPages = Math.ceil(total / limit);
  
  res.status(200).json({
    data: users,
    total,
    page,
    totalPages
  })
})

//@desc Send reset password link
//@route POST /api/v1/users/forgot-password
//@access public
exports.resetLink = asyncMiddleware(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
 
  if (!user)
    return res.status(404).json({
      success: false,
      message: "User not found",
    });

  // generate token
  const token = user.genAuthToken();
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour

  await user.save();

  const resetLink = `http://localhost:4000/api/v1/users/reset-password/${token}`;
  await sendEmail(resetLink, email);

  res.status(200).json({
    success: true,
    message: "Password reset link sent!"
  })
});

//@desc Reset Password
//@route POST /api/v1/users/reset-password/:token
//@access private
exports.resetPassword = asyncMiddleware(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (password.length < 8)
    return res.status(400).json({
      success: false,
      message: "Minimum password length should be 8 characters",
    });

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid or expired token",
    });

  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});
