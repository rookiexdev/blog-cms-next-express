import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import blogRoutes from "./routes/blog.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

export default app;
