import Client, { ClientDocument } from "../models/clients.model.js";
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

// Login Client
const loginClient = asyncHandler(async (req, res) => {
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

  const client: ClientDocument | null = await Client.findOne({ email }).select(
    "-refreshToken"
  );
  if (!client) {
    throw new ApiError(0, "Client not found");
  }
  const isPasswordValid = await client.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(2); // Invalid Password
  }

  const { accessToken, refreshToken, cookieOptions } = await generateAuthTokens(
    client._id as mongoose.Types.ObjectId
  );

  const clientObject = client.toObject();
  delete clientObject.password;

  return res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(1, { client: clientObject }, true));
});

// Register Client
const registerClient = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(new ApiError(-1)); // Data not valid
  }

  const { email, password, role, ledgerName, expiryOn } = req.body;
  if (
    Object.values(req.body).some(
      (value) => value === undefined || value === null || value === ""
    )
  ) {
    throw new ApiError(-1); // Data not valid
  }

  const existingClient: ClientDocument | null = await Client.findOne({
    email,
  }).select("-password -refreshToken");
  if (existingClient) {
    throw new ApiError(-1, "Client already exists");
  }

  const newClient = await Client.create({
    email,
    password,
    role,
    client_db: ledgerName,
    expiryOn,
  });
  if (!newClient) {
    throw new ApiError(0, "Client creation failed");
  }

  return res.json(new ApiResponse(1, { client: newClient }, true));
});

// logout Client
const logoutClient = asyncHandler(async (req, res) => {
  const client = req.client as unknown as ClientDocument;

  if (!client) {
    throw new ApiError(0); // Client not found
  }

  await Client.findByIdAndUpdate(
    client._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };

  return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(1, null, true));
});

export { sendCaptchaCode, loginClient, registerClient, logoutClient };
