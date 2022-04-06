import type { Request, Response, NextFunction } from 'express';
import * as services from './services';
import { SimpleError } from '../../../src/utils/errors';
import { translate } from '../../../src/utils/i18n';

export const getObject = async (req: Request, res: Response, next: NextFunction) => {
  const obj = await services.findOneById(req.params.id);

  // Ownership validation should be here

  if (!obj) {
    throw new SimpleError(500, translate(req, 'notFound'));
  }

  res.locals.obj = obj;
  return next();
};
