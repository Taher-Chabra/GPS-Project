import Client, { JWTPayload } from "../models/clients.model.js";
import jwt, { Secret } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request, Response, NextFunction } from "express";

const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(0, "Access token is missing");
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as JWTPayload;

    const client = await Client.findById(decoded.id);
    if (!client) {
      throw new ApiError(0, "Client not found");
    }

    req.client = client as any;
    next();
  }
);

export { verifyJWT };
