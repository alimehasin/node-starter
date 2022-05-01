import { Request } from 'express';
import { TranslationFn } from '../../types';
import { getLocale } from '../helpers';
import translations from './translations';

const translate = (req: Request): TranslationFn => {
  return (query) => {
    const locale = getLocale(req);
    let data = translations[locale];

    const keys = query.split('.');
    keys.forEach((key) => {
      data = data[key];
    });

    return data;
  };
};

export default translate;
