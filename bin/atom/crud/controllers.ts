import type { Request, Response } from "express";
import * as schemas from "./schemas";
import * as services from "./services";

export const list = async (req: Request, res: Response) => {
  // Validate query
  const query = schemas.query.parse(req.query);

  // Get all objects
  const [count, objects] = await services.findMany(query);

  // Response
  return res.json({ count, results: objects });
};

export const create = async (req: Request, res: Response) => {
  // Validate data
  const data = schemas.create.parse(req.body);

  // Create an object
  const object = await services.create(data);

  // Response
  return res.status(201).json(object);
};

export const retrieve = async (req: Request, res: Response) => {
  return res.json(res.locals.obj);
};

export const update = async (req: Request, res: Response) => {
  // Validate data
  const data = schemas.update.parse(req.body);

  // Update the object
  const object = await services.update(res.locals.obj.id, data);

  // Response
  return res.json(object);
};

export const destroy = async (req: Request, res: Response) => {
  // Destroy the object
  await services.destroy(res.locals.obj.id);

  // Response
  return res.status(204).json();
};
