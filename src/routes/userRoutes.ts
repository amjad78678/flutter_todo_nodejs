import express from "express";
import { postRegister } from "../controller/userController";
import { auth } from "../middleware/auth";
const router = express.Router();

router.post("/register", auth, postRegister);

export default router;
