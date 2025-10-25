import mongoose from "mongoose";
import Client, { ClientDocument } from "../models/clients.model.js";
import { ApiError } from "./ApiError.js";

const generateAuthTokens = async (clientId: mongoose.Types.ObjectId) => {
  const client: ClientDocument | null = await Client.findById(clientId);
  if (!client) {
    throw new ApiError(0); // Client not Found
  }
  const accessToken = client.generateAccessToken();
  const refreshToken = client.generateRefreshToken();

  client.refreshToken = refreshToken;
  await client.save();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  };

  return { accessToken, refreshToken, cookieOptions };
};

export { generateAuthTokens };
