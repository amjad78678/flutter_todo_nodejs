import connectDb from "@/config/connectDb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const users = await User.find({});
    return NextResponse.json({ users: users }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
