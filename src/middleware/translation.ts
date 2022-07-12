import type { Handler } from 'express';
import { TranslationFn } from '../types';
import { getLocale } from '../utils/helpers';
import translations from '../utils/i18n/translations';

const translation: Handler = async (req, res, next) => {
  const t: TranslationFn = (query, ...values: string[]) => {
    const keys = query.split('.');
    const locale = getLocale(req);
    let data = translations[locale];

    keys.forEach((key) => {
      data = data[key];
    });

    // Check if the final result is not a string
    if (typeof data !== 'string') {
      return '';
    }

    for (let i = 0; i < values.length; i += 1) {
      data = data.replace(`_${i}`, values[i]);
    }

    return data;
  };

  req.t = t;

  return next();
};

export default translation;
