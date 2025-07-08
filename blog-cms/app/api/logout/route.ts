import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    (await cookies()).set({
      name: "token",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    return NextResponse.json({ message: "Logged out", logout: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", logout: false },
      { status: 500 }
    );
  }
}
