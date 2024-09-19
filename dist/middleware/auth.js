"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    console.log("iam headers", req.headers);
    console.log("i am apikey", apiKey);
    if (apiKey === process.env.MY_API_KEY) {
        next();
    }
    else {
        res.status(403).json({ message: "Forbidden: Invalid API Key" });
    }
};
exports.auth = auth;
