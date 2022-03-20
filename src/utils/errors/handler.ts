import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import SimpleError from './simple';
import logger from '../logger';
import { ENVIRONMENT } from '../secrets';

const types = {
  SIMPLE: 'SIMPLE',
  ZOD_FLATTENED: 'ZOD_FLATTENED',
  DB_OPERATION: 'DB_OPERATION',
  UNHANDLED_ERROR: 'UNHANDLED_ERROR',
};

export default async (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ENVIRONMENT === 'development') {
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
    if (ENVIRONMENT === 'development') {
      return res.status(400).json({
        _type: types.DB_OPERATION,
        error: JSON.stringify(error),
      });
    }

    return res.status(500).json({
      _type: types.DB_OPERATION,
      detail: 'Unhandled error',
    });
  }

  return res.status(500).json({
    _type: types.UNHANDLED_ERROR,
    detail: 'Unhandled error',
  });
};
