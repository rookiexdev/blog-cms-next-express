import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { username: true },
        },
      },
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blogs",
    });
  }
};

export const createBlog = async (req: any, res: Response) => {
  try {
    const userId = req?.userId;
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

    const newBlog = await prisma.blog.create({
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
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      res.status(400).json({ message: "Missing blog id", success: false });
    }
    const blog = await prisma.blog.findUnique({
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
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", success: false });
  }
};

export const deleteBlogById = async (req: any, res: Response) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      res.status(400).json({ message: "Missing blog id", success: false });
    }
    const blog = await prisma.blog.delete({
      where: { id: blogId, authorId: req.userId },
    });
    if (!blog) {
      res.status(404).json({ message: "Blog not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Blog deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", success: false });
  }
};
