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
exports.postRegister = void 0;
const asyncErrorHandler_1 = __importDefault(require("../config/asyncErrorHandler"));
const userModel_1 = __importDefault(require("../model/userModel"));
const postRegister = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    console.log("iam reqbody", req.body);
    if (!username || !email || !password) {
        res.status(400).json({
            status: "fail",
            message: "Please provide username, email and password",
        });
    }
    const user = yield userModel_1.default.create({ username, email, password });
    res.status(201).json({
        status: "success",
        user,
    });
}));
exports.postRegister = postRegister;
