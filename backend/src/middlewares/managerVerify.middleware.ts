import { Request, Response, NextFunction } from "express";

export const verifyManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access. No user found" });
    }

    if (user.role !== "manager") {
      return res.status(403).json({ message: "Forbidden Access. Only admin & manager can access" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error in verifyManager" });
  }
};
