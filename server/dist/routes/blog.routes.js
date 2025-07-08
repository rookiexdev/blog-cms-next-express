"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controllers_1 = require("../controllers/blog.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", blog_controllers_1.getAllBlogs);
router.post("/create", auth_middleware_1.isAuthenticated, blog_controllers_1.createBlog);
exports.default = router;
