import type { Handler } from 'express';
import { z } from 'zod';
import { getLocale } from '../utils/helpers';
import { zodErrorMaps } from '../utils/i18n';

const setZodErrors = (): Handler => {
  return (req, res, next) => {
    const locale = getLocale(req);

    z.setErrorMap(zodErrorMaps[locale]);

    return next();
  };
};

export default setZodErrors;
