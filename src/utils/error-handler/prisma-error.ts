import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import types from "./types";
import { ENVIRONMENT } from "../secrets";

export default async (
  req: Request,
  res: Response,
  error: Prisma.PrismaClientKnownRequestError
) => {
  if (ENVIRONMENT === "development") {
    return res.status(400).json({
      _type: types.DB_OPERATION,
      error: JSON.stringify(error),
    });
  }

  return res.status(500).json({
    _type: types.DB_OPERATION,
    detail: "Unknown error please report this.",
  });
};
