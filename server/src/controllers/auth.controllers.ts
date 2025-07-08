import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const userRegister = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res
        .status(400)
        .json({ message: "Missing username or password", success: false });
    }
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .json({ message: "Missing username or password", success: false });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      res.status(409).json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", success: false });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res
        .status(400)
        .json({ message: "Missing username or password", success: false });
    }
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .json({ message: "Missing username or password", success: false });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ message: "No user found", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password!);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ userId: user?.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    res.status(200).json({ message: "Login successful", success: true, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", success: false });
  }
};
