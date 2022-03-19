import { Request } from 'express';
import translations from './translations';

function translate(req: Request, query: string): string {
  const locale = req.acceptsLanguages()[0] === 'ar' ? 'ar' : 'en';
  let data = translations[locale];

  const keys = query.split('.');
  keys.forEach((key) => {
    data = data[key];
  });

  return data;
}

export default translate;
