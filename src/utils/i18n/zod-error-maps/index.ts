import { z } from 'zod';
import en from './en';
import ar from './ar';

const zodErrorMaps: any = { en, ar };

const setZodErrorMap = (locale: string) => {
  z.setErrorMap(zodErrorMaps[locale]);
};

export default zodErrorMaps;
export { setZodErrorMap };
