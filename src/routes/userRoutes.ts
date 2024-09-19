import express from "express";
import { postRegister } from "../controller/userController";
const router = express.Router();

router.post("/register", postRegister);

export default router;
