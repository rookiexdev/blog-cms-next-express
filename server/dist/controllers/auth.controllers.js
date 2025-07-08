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
exports.userLogin = exports.userRegister = void 0;
const prisma_1 = require("../config/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            res
                .status(400)
                .json({ message: "Missing username or password", success: false });
        }
        const { username, password } = req.body;
        if (!username || !password) {
            res
                .status(400)
                .json({ message: "Missing username or password", success: false });
        }
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { username },
        });
        if (existingUser) {
            res.status(409).json({ message: "User already exists", success: false });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield prisma_1.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            message: "User created successfully",
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", success: false });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            res
                .status(400)
                .json({ message: "Missing username or password", success: false });
        }
        const { username, password } = req.body;
        if (!username || !password) {
            res
                .status(400)
                .json({ message: "Missing username or password", success: false });
        }
        const user = yield prisma_1.prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            res.status(401).json({ message: "No user found", success: false });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials", success: false });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user.id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        res.status(200).json({ message: "Login successful", success: true, token });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in user", success: false });
    }
});
exports.userLogin = userLogin;
