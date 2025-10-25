import User, { UserDocument } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAuthTokens } from "../utils/generateAuthTokens.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import svgCaptcha from "svg-captcha";

// Send Captcha Code
const sendCaptchaCode = asyncHandler(async (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 2,
    color: true,
    background: "#d0e0e3",
  });

  req.session.captcha = captcha.text;
  return res.type("image/svg+xml").send(captcha.data);
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, captchaToken } = req.body;
  console.log(email, password, captchaToken);
  if (!email || !password || !captchaToken) {
    throw new ApiError(-1); // Data not valid
  }

  if (!req.session.captcha || captchaToken !== req.session.captcha) {
    req.session.captcha = null;
    throw new ApiError(-2); // Captcha Expired
  }

  req.session.captcha = null;

  const user: UserDocument | null = await User.findOne({ email }).select(
    "-refreshToken"
  );
  if (!user) {
    throw new ApiError(0, "User not found");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(2); // Invalid Password
  }

  const { accessToken, refreshToken, cookieOptions } = await generateAuthTokens(
    user._id as mongoose.Types.ObjectId
  );

  const userObject = user.toObject();
  delete userObject.password;

  return res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(1, { user: userObject }, true));
});

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(new ApiError(-1)); // Data not valid
  }

  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    throw new ApiError(-1); // Data not valid
  }

  const existingUser: UserDocument | null = await User.findOne({
    email,
  }).select("-password -refreshToken");
  if (existingUser) {
    throw new ApiError(-1, "User already exists");
  }

  const newUser = await User.create({
    email,
    password,
    role,
  });
  if (!newUser) {
    throw new ApiError(0, "User creation failed");
  }

  return res.json(new ApiResponse(1, { user: newUser }, true));
});

// logout User
const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user as unknown as UserDocument;

  if (!user) {
    throw new ApiError(0); // User not found
  }

  await User.findByIdAndUpdate(
    user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(1, null, true));
});

export { sendCaptchaCode, loginUser, registerUser, logoutUser };
