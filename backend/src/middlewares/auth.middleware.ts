import User, { JWTPayload } from "../models/user.model.js";
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
    
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError(0, "User not found");
    }

    req.user = user as any;
    next();
  }
);

export { verifyJWT };
