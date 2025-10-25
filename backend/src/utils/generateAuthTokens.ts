import mongoose from "mongoose";
import User, { UserDocument } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";

const generateAuthTokens = async (userId: mongoose.Types.ObjectId) => {
  const user: UserDocument | null = await User.findById(userId);
  if (!user) {
    throw new ApiError(0); // User not Found
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  };

  return { accessToken, refreshToken, cookieOptions };
};

export { generateAuthTokens };
