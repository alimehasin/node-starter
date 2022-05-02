import type { Handler } from 'express';
import { z } from 'zod';
import generateZodErrorMap from '../utils/errors/zod';

const setZodErrors = (): Handler => async (req, res, next) => {
  z.setErrorMap(generateZodErrorMap(req));

  return next();
};

export default setZodErrors;
