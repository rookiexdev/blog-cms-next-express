import { Response } from "express";
import { prisma } from "../config/prisma";

export const getUserInfo = async (req: any, res: Response) => {
  try {
    const userId = req?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized", success: false });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });
    if (!user) {
      res.status(401).json({ message: "User not found", success: false });
    }
    res
      .status(200)
      .json({
        message: "Authenticated",
        isAuthenticated: true,
        user,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", success: false });
  }
};
