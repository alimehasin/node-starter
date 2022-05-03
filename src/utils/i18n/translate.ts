import { Request } from 'express';
import { TranslationFn } from '../../types';
import { getLocale } from '../helpers';
import translations from './translations';

const translate = (req: Request): TranslationFn => {
  return (query) => {
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

    return data;
  };
};

export default translate;
