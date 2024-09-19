import { Request, Response } from "express";
import asyncErrorHandler from "../config/asyncErrorHandler";
import User from "../model/userModel";

const postRegister = asyncErrorHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  console.log("iam reqbody", req.body);

  if (!username || !email || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please provide username, email and password",
    });
  }

  const user = await User.create({ username, email, password });

  res.status(201).json({
    status: "success",
    user,
  });
});

export { postRegister };
