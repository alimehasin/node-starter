import type { Request, Response, NextFunction } from "express";
import Service from "./service";

const service = new Service();

export const getObject = async (req: Request, res: Response, next: NextFunction) => {
  const example = await service.findOneById(req.params.id);

  // Ownership validation should be here

  if (!example) {
    return res.status(404).json({ detail: "Example not found." });
  }

  res.locals.obj = example;
  return next();
};
