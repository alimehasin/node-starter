import type { Request, Response } from "express";
import * as schemas from "./schemas";
import Service from "./service";

const service = new Service();

export default class Controller {
  list = async (req: Request, res: Response) => {
    // Validate query
    const query = schemas.query.parse(req.query);

    // Get all examples
    const [count, examples] = await service.findMany(query);

    // Response
    return res.json({ count, results: examples });
  };

  create = async (req: Request, res: Response) => {
    // Validate data
    const data = schemas.create.parse(req.body);

    // Create an example
    const example = await service.create(data);

    // Response
    return res.status(201).json(example);
  };

  retrieve = async (req: Request, res: Response) => {
    return res.json(res.locals.obj);
  };

  update = async (req: Request, res: Response) => {
    // Validate data
    const data = schemas.update.parse(req.body);

    // Update the example
    const example = await service.update(res.locals.obj.id, data);

    // Response
    return res.json(example);
  };

  delete = async (req: Request, res: Response) => {
    // Delete the example
    await service.delete(res.locals.obj.id);

    // Response
    return res.status(204).json();
  };
}
