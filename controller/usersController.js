const asyncMiddleware = require("../middleware/async");
const { Resend } = require("resend");
const User = require("../models/User");

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
    message: "User Registered successfully",
    data: token,
  });
});

//@desc Login User
//@route POST /api/v1/users/login
//@access public
exports.loginUser = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || (await !user.isValidPassword(password)))
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

  const resetLink = `http://localhost:3000/api/v1/users/reset-password/${token}`;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">Click here to reset your password</a>`,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link sent!",
      data: token,
    });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
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
