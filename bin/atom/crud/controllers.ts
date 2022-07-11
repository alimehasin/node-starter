import type { Handler } from 'express';
import * as schemas from './schemas';
import * as services from './services';

export const list: Handler = async (req, res) => {
  // Validate query
  const query = schemas.query.parse(req.query);

  // Get all _objects
  const data = await services.findMany(query);

  // Response
  return res.json(data);
};

export const retrieve: Handler = async (req, res) => {
  // Get _object
  const _object = await services.find_ObjectById(req.object.id);

  // Return response
  return res.json(_object);
};

export const create: Handler = async (req, res) => {
  // Validate data
  const data = schemas.create.parse(req.body);

  // Create an _object
  const _object = await services.create(data);

  // Response
  return res.status(201).json(_object);
};

export const update: Handler = async (req, res) => {
  // Validate data
  const data = schemas.update.parse(req.body);

  // Update the _object
  const _object = await services.update(req.object.id, data);

  // Response
  return res.json(_object);
};

export const destroy: Handler = async (req, res) => {
  // Destroy the _object
  await services.destroy(req.object.id);

  // Response
  return res.status(204).json();
};
