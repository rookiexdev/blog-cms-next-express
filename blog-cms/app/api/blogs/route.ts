import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { username: true },
        },
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Missing title or content" },
        { status: 400 }
      );
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: decoded.userId,
      },
    });

    return NextResponse.json(
      { message: "Blog created successfully", data: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
