import express from "express";
import { getWork, postRegister } from "../controller/userController";
import { auth } from "../middleware/auth";
const router = express.Router();

router.get("/", getWork);
router.post("/register", auth, postRegister);

export default router;
