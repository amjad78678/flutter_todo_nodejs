"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        res.status(statusCode).json({
            status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        res.status(statusCode).json({
            status,
            message: statusCode === 500 ? "Something went wrong" : err.message,
        });
    }
};
exports.globalErrorHandler = globalErrorHandler;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    }
}
exports.AppError = AppError;
