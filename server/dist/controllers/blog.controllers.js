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
exports.deleteBlogById = exports.getBlogById = exports.createBlog = exports.getAllBlogs = void 0;
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
    try {
        const userId = req === null || req === void 0 ? void 0 : req.userId;
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
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        if (!blogId) {
            res.status(400).json({ message: "Missing blog id", success: false });
        }
        const blog = yield prisma_1.prisma.blog.findUnique({
            where: { id: blogId },
            include: {
                author: {
                    select: { username: true },
                },
            },
        });
        if (!blog) {
            res.status(404).json({ message: "Blog not found", success: false });
        }
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching blog", success: false });
    }
});
exports.getBlogById = getBlogById;
const deleteBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        if (!blogId) {
            res.status(400).json({ message: "Missing blog id", success: false });
        }
        const blog = yield prisma_1.prisma.blog.delete({
            where: { id: blogId, authorId: req.userId },
        });
        if (!blog) {
            res.status(404).json({ message: "Blog not found", success: false });
        }
        res
            .status(200)
            .json({ message: "Blog deleted successfully", success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting blog", success: false });
    }
});
exports.deleteBlogById = deleteBlogById;
