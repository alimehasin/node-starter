import type { Handler } from 'express';
import * as services from './services';
import { SimpleError } from '../../utils/errors';
import { translate } from '../../utils/i18n';

export const getObject: Handler = async (req, res, next) => {
  const _object = await services._get_ObjectById(req, req.params.id);

  // Ownership validation should be here

  if (!_object) {
    throw new SimpleError(404, translate(req)('notFound'));
  }

  req.object = _object;
  return next();
};
