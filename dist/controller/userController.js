"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWork = exports.postRegister = void 0;
const asyncErrorHandler_1 = __importDefault(require("../config/asyncErrorHandler"));
const userModel_1 = __importDefault(require("../model/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postRegister = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log("iam reqbody", req.body);
    if (!username || !email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Please provide username, email and password",
        });
    }
    try {
        const bcryptedPassword = yield bcryptjs_1.default.hash(password.toString(), 10);
        console.log("Bcrypted Password:", bcryptedPassword);
        // Continue with the rest of your registration logic, like saving the user
        const newUser = yield userModel_1.default.create({
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
    }
    catch (err) {
        console.error("Error hashing password or saving user:", err);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error during registration",
        });
    }
}));
exports.postRegister = postRegister;
const getWork = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: "success",
        message: "Server is up and running",
    });
}));
exports.getWork = getWork;
