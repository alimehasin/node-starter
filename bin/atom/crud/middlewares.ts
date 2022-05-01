import type { Handler } from 'express';
import * as services from './services';
import { SimpleError } from '../../../src/utils/errors';
import { translate } from '../../../src/utils/i18n';

export const getObject: Handler = async (req, res, next) => {
  const obj = await services._getById(req, req.params.id);

  // Ownership validation should be here

  if (!obj) {
    throw new SimpleError(404, translate(req)('notFound'));
  }

  res.locals.obj = obj;
  return next();
};
