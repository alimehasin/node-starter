import { Request } from 'express';
import translations from './translations';

function translate(req: Request, query: string, obj?: { [key: string]: string }): string {
  const locale = req.acceptsLanguages()[0] === 'ar' ? 'ar' : 'en';
  let data = translations[locale];

  const keys = query.split('.');
  keys.forEach((key) => {
    data = data[key];
  });

  if (obj) {
    Object.entries(obj).forEach(([key, value]) => {
      data = data.replace(`{${key}}`, `${value}`);
    });
  }

  return data;
}

export default translate;
