"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api/v1/blogs", blog_routes_1.default);
exports.default = app;
