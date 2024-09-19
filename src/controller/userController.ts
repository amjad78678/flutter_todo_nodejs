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

  // const bcryptedPassword = await bcryptjs.hash(password, 10);
  // console.log("iam bcrypted", bcryptedPassword);
  const user = await User.create({
    username,
    email,
    password: password,
  });

  res.status(201).json({
    status: "success",
    user,
  });
});
const getWork = asyncErrorHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is up and running",
  });
});

export { postRegister, getWork };
