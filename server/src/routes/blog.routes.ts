import { Router } from "express";
import {
  createBlog,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
} from "../controllers/blog.controllers";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllBlogs);
router.post("/create", isAuthenticated, createBlog);
router.get("/:id", getBlogById);
router.delete("/:id", isAuthenticated, deleteBlogById);

export default router;
