import mongoose, { Model, Schema, Document } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  profilePic: {
    imageUrl: string;
    public_id: string;
  };
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
    profilePic: {
      imageUrl: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png",
      },
      public_id: { type: String, default: "" },
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

const UserModel: Model<User & Document> = mongoose.model<User & Document>(
  "User",
  userSchema
);

export default UserModel;
