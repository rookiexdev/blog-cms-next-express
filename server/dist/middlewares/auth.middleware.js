"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const isAuthenticated = (req, res, next) => {
    try {
        const { token } = req.cookies;
        const token2 = token || req.headers.token;
        if (!token2) {
            res.status(401).json({ message: "Unauthorized User" });
        }
        else {
            const decoded = jsonwebtoken_1.default.verify(token2, JWT_SECRET);
            req.userId = decoded.userId;
            next();
        }
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized User " });
    }
};
exports.isAuthenticated = isAuthenticated;
