import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export type JWTPayload = { id: string; email: string };

export interface UserDocument extends mongoose.Document {
  slno: number;
  email: string;
  role: "client" | "guest" | "admin";
  password: string;
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    slno: {
      type: Number,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
      maxLength: 64,
    },
    role: {
      type: String,
      enum: ["client", "guest", "admin"],
      default: "guest",
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 characters long"],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateAccessToken = function (): string {
  const payload: JWTPayload = { id: this._id, email: this.email };
  const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  const options: SignOptions = { expiresIn: "15m" };

  return jwt.sign(payload, secret, options);
};

UserSchema.methods.generateRefreshToken = function (): string {
  const payload = { id: this._id };
  const secret = process.env.REFRESH_TOKEN_SECRET as Secret;
  const options: SignOptions = { expiresIn: "3d" };

  return jwt.sign(payload, secret, options);
};

const AutoIncrement = AutoIncrementFactory(mongoose as any);
UserSchema.plugin(AutoIncrement as any, { inc_field: "slno" });

const User = mongoose.model("User", UserSchema);

export default User;
