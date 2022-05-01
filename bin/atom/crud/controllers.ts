import type { Handler } from 'express';
import * as schemas from './schemas';
import * as services from './services';

export const list: Handler = async (req, res) => {
  // Validate query
  const query = schemas.query.parse(req.query);

  // Get all objects
  const [count, objects] = await services.findMany(query);

  // Response
  return res.json({ count, results: objects });
};

export const create: Handler = async (req, res) => {
  // Validate data
  const data = schemas.create.parse(req.body);

  // Create an object
  const object = await services.create(data);

  // Response
  return res.status(201).json(object);
};

export const retrieve: Handler = async (req, res) => {
  return res.json(res.locals.obj);
};

export const update: Handler = async (req, res) => {
  // Validate data
  const data = schemas.update.parse(req.body);

  // Update the object
  const object = await services.update(res.locals.obj.id, data);

  // Response
  return res.json(object);
};

export const destroy: Handler = async (req, res) => {
  // Destroy the object
  await services.destroy(res.locals.obj.id);

  // Response
  return res.status(204).json();
};
