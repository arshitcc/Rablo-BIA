import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import { Request } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  EMAIL_VERIFICATION_TOKEN_EXPIRY,
} from "../utils/env";
import {
  AvailableAuthTypes,
  AvailableUserRoles,
  UserAuthType,
  UserRolesEnum,
} from "../constants/constants";

export interface IUser extends Document {
  fullname: string;
  email: string;
  username: string;
  password: string;
  loginType: string;
  avatar: object;
  role: string;
  isEmailVerified: boolean;
  emailVerificationToken: string | undefined;
  emailVerificationExpiry: Date | undefined;
  forgotPasswordToken: string | undefined;
  forgotPasswordExpiry: Date | undefined;
  refreshToken: string;
  isPasswordCorrect(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  generateTemporaryToken(): {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: Date;
  };
}

export interface CustomRequest extends Request {
  user: IUser;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    avatar: {
      type: {
        url: String,
        format: String,
        resource_type: String,
        public_id: String,
      },
    },
    loginType: {
      type: String,
      enum: AvailableAuthTypes,
      default: UserAuthType.CREDENTIALS,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (this: IUser, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    ACCESS_TOKEN_SECRET!,
    { expiresIn: eval(ACCESS_TOKEN_EXPIRY!) },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, REFRESH_TOKEN_SECRET!, {
    expiresIn: eval(REFRESH_TOKEN_EXPIRY!),
  });
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha512")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry =
    Date.now() + Number(eval(EMAIL_VERIFICATION_TOKEN_EXPIRY!));

  return { unHashedToken, hashedToken, tokenExpiry: new Date(tokenExpiry) };
};

export const User = mongoose.model<IUser>("User", userSchema);
