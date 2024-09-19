import { Request, Response } from "express";
import asyncErrorHandler from "../config/asyncErrorHandler";
import User from "../model/userModel";
import bcryptjs from "bcryptjs";

const postRegister = asyncErrorHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  console.log("iam reqbody", req.body);

  if (!username || !email || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please provide username, email and password",
    });
  }

  const bcryptedPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: bcryptedPassword,
  });

  res.status(201).json({
    status: "success",
    user,
  });
});

export { postRegister };
