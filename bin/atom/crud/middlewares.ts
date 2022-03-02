import type { Request, Response, NextFunction } from "express";
import * as services from "./services";

export const getObject = async (req: Request, res: Response, next: NextFunction) => {
  const obj = await services.findOneById(req.params.id);

  // Ownership validation should be here

  if (!obj) {
    return res.status(404).json({ detail: "Item not found." });
  }

  res.locals.obj = obj;
  return next();
};
