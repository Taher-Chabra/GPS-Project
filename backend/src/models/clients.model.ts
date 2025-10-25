import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export type JWTPayload = { id: string; email: string, role: string, expiryOn?: Date };

export interface ClientDocument extends mongoose.Document {
  slno: number;
  email: string;
  role: "client" | "guest" | "administrator";
  password: string;
  client_db?: string;
  expiryOn?: Date;
  status: '0' | '1' | '2' | '3';
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const ClientSchema = new mongoose.Schema<ClientDocument>(
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
      enum: ["client", "guest", "administrator"],
      default: "guest",
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 characters long"],
    },
    client_db: {
      type: String,
    },
    expiryOn: {
      type: Date
    },
    status: {
      type: String,
      default: 1,
      enum: ['0', '1', '2', '3'] // 0: Inactive, 1: Active, 2: Paused, 3: Blacklisted
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

ClientSchema.pre("save", async function (next) {
  const client = this;
  if (!client.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(client.password, salt);
  client.password = hashedPassword;
  next();
});

ClientSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

ClientSchema.methods.generateAccessToken = function (): string {
  const payload: JWTPayload = { id: this._id, email: this.email, role: this.role, expiryOn: this.expiryOn };
  const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  const options: SignOptions = { expiresIn: "15m" };

  return jwt.sign(payload, secret, options);
};

ClientSchema.methods.generateRefreshToken = function (): string {
  const payload = { id: this._id };
  const secret = process.env.REFRESH_TOKEN_SECRET as Secret;
  const options: SignOptions = { expiresIn: "3d" };

  return jwt.sign(payload, secret, options);
};

const AutoIncrement = AutoIncrementFactory(mongoose as any);
ClientSchema.plugin(AutoIncrement as any, { inc_field: "slno" });

const Client = mongoose.model("Client", ClientSchema);

export default Client;
