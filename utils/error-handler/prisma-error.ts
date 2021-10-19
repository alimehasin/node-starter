import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export default async (
  req: Request,
  res: Response,
  error: Prisma.PrismaClientKnownRequestError
) => {
  // TODO: Handle the common error codes
  if (error.code === "P2025") {
    return res.status(404).json({ detail: error.message });
  }

  return res.status(400).json({ detail: "DB operation failed." });
};
