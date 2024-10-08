import mongoose, { Schema, Document } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  isBlocked: boolean;
  isDeleted: boolean;
}

const userSchema: Schema = new Schema<User | Document>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;