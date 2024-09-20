import connectDb from "@/config/connectDb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const {
      username,
      email,
      password,
      confirmPassword,
    }: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = await req.json();
    console.log("iam body", username, email, password, confirmPassword);

    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return NextResponse.json(
        { success: false, message: "User already exist" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password and Confirm Password does not match",
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(String(password), salt);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return NextResponse.json(
      { success: true, message: "User created" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
