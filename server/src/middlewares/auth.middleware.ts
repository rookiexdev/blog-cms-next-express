import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { token } = req.cookies;
    const token2 = req.headers.token;
    if (!token2) {
      res.status(401).json({ message: "Unauthorized User" });
    } else {
      const decoded = jwt.verify(token2 as string, JWT_SECRET) as {
        userId: string;
      };
      (req as any).userId = decoded.userId;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized User >>>>>>>>> " });
  }
};
