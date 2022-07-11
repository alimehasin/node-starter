import type { Handler } from 'express';
import { getLocale } from '../utils/helpers';
import { setZodErrorMap } from '../utils/i18n';

const setZodErrors = (): Handler => {
  return (req, res, next) => {
    setZodErrorMap(getLocale(req));

    return next();
  };
};

export default setZodErrors;
