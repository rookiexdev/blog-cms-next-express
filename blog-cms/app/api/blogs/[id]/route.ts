import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  try {
    const blogId = context.params.id;

    if (!blogId) {
      return NextResponse.json({ message: "Missing blog id" }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: { id: blogId as string },
      include: {
        author: {
          select: { username: true },
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog" },
      { status: 500 }
    );
  }
}
