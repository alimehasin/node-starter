import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import prismaErrorHandler from "./prisma-error";
import SimpleError from "../errors";
import { ENVIRONMENT } from "../secrets";

export default async (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ENVIRONMENT === "development") {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  // Simple error
  if (error instanceof SimpleError) {
    return res.status(error.status).json({ detail: error.detail });
  }

  // Zod error
  if (error instanceof ZodError) {
    return res.status(400).json(error);
  }

  // Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return prismaErrorHandler(req, res, error);
  }

  return res.status(500).json("Unhandled error.");
};
