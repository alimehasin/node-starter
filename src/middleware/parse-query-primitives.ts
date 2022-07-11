import type { Handler } from 'express';

const parseQueryPrimitives = (): Handler => {
  function isBoolean(value: unknown) {
    return value === 'true' || value === 'false';
  }

  function parseBoolean(value: unknown) {
    return value === 'true';
  }

  function isNumeric(value: any) {
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(value) && !isNaN(parseFloat(value));
  }

  return (req, res, next) => {
    const result: any = {};

    Object.entries(req.query).forEach(([key, value], i) => {
      if (isBoolean(value)) {
        result[key] = parseBoolean(value);
      } else if (isNumeric(value)) {
        result[key] = parseFloat(value as any);
      } else {
        result[key] = value;
      }
    });

    req.query = result;

    return next();
  };
};

export default parseQueryPrimitives;
