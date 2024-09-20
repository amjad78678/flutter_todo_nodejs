import connectDb from "@/config/connectDb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();
    const body = await req.json();
    console.log("iam body", body);

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    console.log("iam body", body.password);
    await User.updateOne({ _id: params.id }, { $set: { ...body } });

    const user = await User.findOne({ _id: params.id });

    return NextResponse.json(
      { success: true, message: "User is updated", user },
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
