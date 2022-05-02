import type { Handler } from 'express';

const parseQueryPrimitives = (): Handler => {
  function isBoolean(value: unknown) {
    return value === 'true' || value === 'false';
  }

  function parseBoolean(value: unknown) {
    return value === 'true';
  }

  return (req, res, next) => {
    const result: any = {};

    Object.entries(req.query).forEach(([key, value], i) => {
      if (isBoolean(value)) {
        result[key] = parseBoolean(value);
      } else {
        result[key] = value;
      }
    });

    req.query = result;

    return next();
  };
};

export default parseQueryPrimitives;
