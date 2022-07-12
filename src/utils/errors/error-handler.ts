import { AssertionError } from 'assert';
import { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import SimpleError from './simple';
import { ENVIRONMENT } from '../secrets';

const types = {
  SIMPLE: 'SIMPLE',
  ZOD_FLATTENED: 'ZOD_FLATTENED',
  DB_OPERATION: 'DB_OPERATION',
  UNHANDLED_ERROR: 'UNHANDLED_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
};

const errorHandler: ErrorRequestHandler = async (error, req, res, next) => {
  if (ENVIRONMENT === 'development') {
    console.error(error);
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

  // Assertion error
  if (error instanceof AssertionError) {
    return res.status(500).json({
      _type: types.SERVER_ERROR,
      detail: req.t('serverError'),
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

export default errorHandler;
