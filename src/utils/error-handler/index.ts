import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import prismaErrorHandler from "./prisma-error";
import types from "./types";
import SimpleError from "../errors";
import { ENVIRONMENT } from "../secrets";
import { logger } from "..";

export default async (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ENVIRONMENT === "development") {
    logger.error(error);
  }

  // Simple error
  if (error instanceof SimpleError) {
    return res.status(error.status).json({
      _type: types.SIMPLE,
      detail: error.detail,
    });
  }

  // Zod error
  if (error instanceof ZodError) {
    return res.status(400).json({
      _type: types.ZOD_FLATTENED,
      ...error.flatten(),
    });
  }

  // Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return prismaErrorHandler(req, res, error);
  }

  return res.status(500).json("Unhandled error.");
};
