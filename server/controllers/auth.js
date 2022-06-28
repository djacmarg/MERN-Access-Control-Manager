//import User Model
const User = require("./../models/User");
//UUID for unique strings creation UUID version 4
const { v4: uuidv4 } = require("uuid");
//import the mail from utilities directory
const {
  generateOTP,
  mailTransporter,
  HTMLEmailTemplate,
} = require("./../utils/mail");

//import the helpers file from utilities directory
const { invokeError, createdRandomBytes } = require("../utils/helpers");
const { json } = require("express");
const VerificationToken = require("./../models/verificationToken");
const { isValidObjectId } = require("mongoose");
const verificationToken = require("./../models/verificationToken");
const ResetToken = require("./../models/resetToken");
const frontEndBaseURL = "http://localhost:3000";
//generate unique string and store its value
const uniqueString = uuidv4();
const OTP_CODE = generateOTP();
//enhance uniqueness of the unique string further
const OTP = OTP_CODE+uniqueString

//This controller will create a new user/account
const Register = async (req, res) => {
  try { 
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return invokeError(res, "User already exist");
  }
  const newUser = new User({
    email,
    password,
  });

  const verificationToken = new VerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await verificationToken.save();
  await newUser.save();

  mailTransporter().sendMail({
    from: `YourBusinessName:  <{process.env.AUTH_SENDER_EMAIL}>`,
    to: newUser.email,
    subject: "Verify Your Email is Real",
    html: HTMLEmailTemplate(`<p> Hello ${newUser.email} <br />Please verify your email by clicking on the Link below</p>`,
      `${frontEndBaseURL}/verify-email?userId=${newUser._id}&otp=${OTP}`
    ),

     });
  res.json({success: true, message: `Account created with ${newUser.email}, Please check your email to verify your account`, user: {email: newUser.email, id: newUser._id}})
  } catch (error) {
    if(error?.errors?.email) { 
        return invokeError(res, error.errors.email.message)
    }
    if(error?.errors?.password){
      return invokeError(res, error.errors.password.message)
    } 
    return invokeError(res, error)
  }
};

//This controller will logs users in to their account
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return invokeError(res, "Both email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return invokeError(res, `User with this email: ${email} does not exist!`);
  }
  if (!user.verified) {
    return invokeError(res, "This User has not been verified!");
  }  
  const isPasswordCorrect = await user.validatePassword(password);
  if (!isPasswordCorrect) {
    return invokeError(res, "Password entered is not correct");
  }
  const token = await user.createJWT();
  if(!token) return invokeError(res, "Unable to sign token")

  mailTransporter().sendMail({
    from: `YourBusinessName:  <{process.env.AUTH_SENDER_EMAIL}>`,
    to: user.email,
    subject: "Signin Notification!",
    html: HTMLEmailTemplate(`<h3>Welcome back!</h3>`, `<p>Welcome back, your login was successful</p>`),
  });

  return res.send({
    success: true, message: "Login was successful",
    user: { email: user.email, id: user._id, auth: token },
  });
};

//This controller will help verifying email address
const verifyEmail = async (req, res) => {
  const {otp,  userId } = req.query;
  if (!userId.trim() || !otp.trim()) return invokeError(res, "Invalid request, missing query parameters!");
  if (!isValidObjectId(userId)) return invokeError(res, "Invalid user id");

  const user = await User.findById(userId);
  if (!user) return invokeError(res, "User not found!");

  if (user.verified) return invokeError(res, "Account already verified");

  const token = await verificationToken.findOne({ owner: user._id });
  if (!token) return invokeError(res, "Sorry, user not found");

  const isTokenMatched = await token.validateToken(otp);
  if (!isTokenMatched)  return invokeError(res, "Please provide a valid token/otp");

  await VerificationToken.findByIdAndDelete(token._id);
  //this helps to update / set verified field to true, from its default value of false
  await user.updateOne({ $set: { "verified": "true" } });
 
  //This send an email to the user
  mailTransporter().sendMail({
    from: `YourBusinessName: <{process.env.AUTH_SENDER_EMAIL}>`,
    to: user.email,
    subject: "Email verified successfully",
    html: HTMLEmailTemplate( `<h3>Welcome ${user.email}!...</h3>`, `<p>Your Email has been dully verified and you can now access our services</p>`),
  });

  res.json({
    success: true,
    message: "Your Email has been verified",
    user: { email: user.email, id: user._id },
  });
};

//This sends a password reset link to the user
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return invokeError(res, "Invalid email");

  const user = await User.findOne({ email });
  if (!user) return invokeError(res, "User not found!");

  const rToken = await ResetToken.findOne({ owner: user._id });
  if (rToken)
    return invokeError(
      res,
      "You have valid token, you cannot reset the token now. Use it instead!"
    );

  const token = await createdRandomBytes();
  const resetToken = new ResetToken({ owner: user._id, token });
  await resetToken.save();

  mailTransporter().sendMail({
    from: `YourBusinessName:  <{process.env.AUTH_SENDER_EMAIL}>`,
    to: user.email,
    subject: "Password Reset Request",
    html: HTMLEmailTemplate("Click the link below to Reset your password, unless you requested it by mistake",
      `${frontEndBaseURL}/reset-password?token=${token}&id=${user._id}`
    ),
  });
  res.json({
    success: true,
    message: `Password reset link has been sent to your ${user.email} `,
  });
};

//This is use to reset password to a new password of choice 
const resetPassword = async (req, res) => {
  const { password } = req.body; 
  const user = await User.findById(req.user._id);
  if (!user) return invokeError(res, "User not found");
  
  const isSamePassword = await user.validatePassword(password)
  if(isSamePassword) return invokeError(res, "New password must be different from the current one")

  if (password.trim().length < 8)
  return invokeError(res, "Password must not be less than 8 characters");

  user.password = password.trim();
  await user.save();
  await ResetToken.findOneAndDelete({owner: user._id})

  mailTransporter().sendMail({
    from: `YourBusinessName: <{process.env.AUTH_SENDER_EMAIL}>`,
    to: user.email,
    subject: "Password Reset Successfully",
    html: HTMLEmailTemplate( `Password Reset Successfully!`,
    `<p>You may now use the new / or reset password</p>`),
  });
  res.json({ success: true, mesasage: "Password reset successfully!" });
};

//Here we export all of our working controllers
module.exports = {
  Register,
  Login,
  verifyEmail,
  forgotPassword,
  resetPassword
};
