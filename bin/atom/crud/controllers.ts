import type { Handler } from 'express';
import * as schemas from './schemas';
import * as services from './services';

export const list: Handler = async (req, res) => {
  // Validate query
  const query = schemas.query.parse(req.query);

  // Get all _objects
  const [count, _objects] = await services.findMany(req, query);

  // Response
  return res.json({ count, results: _objects });
};

export const retrieve: Handler = async (req, res) => {
  // Get _object
  const _object = await services.findOneById(req, req.object.id);

  // Return response
  return res.json(_object);
};

export const create: Handler = async (req, res) => {
  // Validate data
  const data = schemas.create.parse(req.body);

  // Create an _object
  const _object = await services.create(req, data);

  // Response
  return res.status(201).json(_object);
};

export const update: Handler = async (req, res) => {
  // Validate data
  const data = schemas.update.parse(req.body);

  // Update the _object
  const _object = await services.update(req, req.object.id, data);

  // Response
  return res.json(_object);
};

export const destroy: Handler = async (req, res) => {
  // Destroy the _object
  await services.destroy(req, req.object.id);

  // Response
  return res.status(204).json();
};
