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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const globalErrorHandler_1 = require("./config/globalErrorHandler");
const connectDb_1 = require("./config/connectDb");
const port = process.env.PORT || 4000;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cors_1.default)({
            origin: "*",
        }));
        app.use("/api", userRoutes_1.default);
        app.use(globalErrorHandler_1.globalErrorHandler);
        // Bind the server first
        const httpServer = http_1.default.createServer(app);
        httpServer.listen(port, () => __awaiter(this, void 0, void 0, function* () {
            console.log(`${port} is running on localhost`);
            // Now try to connect to the database
            try {
                yield (0, connectDb_1.connectDB)();
                console.log('Database connected successfully');
            }
            catch (err) {
                console.error('Error connecting to the database:', err);
                process.exit(1); // Exit the process if the DB connection fails
            }
        }));
    });
}
init();
