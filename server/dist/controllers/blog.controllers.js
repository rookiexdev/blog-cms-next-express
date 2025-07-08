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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlog = exports.getAllBlogs = void 0;
const prisma_1 = require("../config/prisma");
const getAllBlogs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield prisma_1.prisma.blog.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: { username: true },
                },
            },
        });
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching blogs",
        });
    }
});
exports.getAllBlogs = getAllBlogs;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("user id", userId);
        if (!req.body) {
            res
                .status(400)
                .json({ message: "Missing title or content", success: false });
        }
        const { title, content } = req.body;
        if (!req.body || !title || !content) {
            res
                .status(400)
                .json({ message: "Missing title or content", success: false });
        }
        const newBlog = yield prisma_1.prisma.blog.create({
            data: {
                title,
                content,
                author: {
                    connect: { id: userId },
                },
            },
        });
        res.status(201).json({
            message: "Blog created successfully",
            success: true,
            data: newBlog,
        });
    }
    catch (error) {
        console.error("Create blog error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
});
exports.createBlog = createBlog;
