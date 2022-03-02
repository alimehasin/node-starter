import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const setZodErrors = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Translate errors

  const em: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === "too_small") {
      return { message: ctx.defaultError };
    }

    return { message: ctx.defaultError };
  };

  z.setErrorMap(em);

  return next();
};

export default setZodErrors;
