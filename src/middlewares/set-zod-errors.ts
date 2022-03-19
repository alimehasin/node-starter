import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import generateZodErrorMap from '../utils/errors/zod';

const setZodErrors = async (req: Request, res: Response, next: NextFunction) => {
  z.setErrorMap(generateZodErrorMap(req));

  return next();
};

export default setZodErrors;
