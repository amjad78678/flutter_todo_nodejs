import { Request, Response } from "express";
import asyncErrorHandler from "../config/asyncErrorHandler";
import User from "../model/userModel";
import bcryptjs from "bcryptjs";

const postRegister = asyncErrorHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  console.log("iam reqbody", req.body);

  if (!username || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide username, email and password",
    });
  }
  try {
    const bcryptedPassword = await bcryptjs.hash(password.toString(), 10);
    console.log("Bcrypted Password:", bcryptedPassword);

    // Continue with the rest of your registration logic, like saving the user
    const newUser = await User.create({
      username,
      email,
      password: bcryptedPassword,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.error("Error hashing password or saving user:", err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error during registration",
    });
  }
});
const getWork = asyncErrorHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is up and running",
  });
});

export { postRegister, getWork };
