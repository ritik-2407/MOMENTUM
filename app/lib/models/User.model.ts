import mongoose, { Schema, Document, Model } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser extends Document {
  username: string;
  password?: string; // Optional because we might omit it when returning user docs
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password
UserSchema.methods.comparePassword = async function (password: string) {
  if (!this.password) return false;
  return bcryptjs.compare(password, this.password);
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
