import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as validator from "./validator";
import Service from "./service";
import { loginObject, refreshTokens } from "./helpers";
import { SimpleError } from "../../utils";

const service = new Service();

export default class Controller {
  static login = async (req: Request, res: Response) => {
    const data = validator.login(req);

    const user: any = await service.getUserByUsername(data.username, false);

    // Check for password
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new SimpleError(
        400,
        "Unable to login with the provided credentials."
      );
    }

    // Check for account activation state
    if (user.deactivatedAt) {
      throw new SimpleError(400, "Your account is deactivated.");
    }

    // Update last login
    service.updateLastLogin(user);

    // Login object
    const object = loginObject(user);

    return res
      .status(200)
      .cookie("access-token", object.tokens.access, {
        path: "/",
        httpOnly: true,
      })
      .json(object);
  };

  static register = async (req: Request, res: Response) => {
    const data = await validator.register(req);

    const user: any = await service.createUser(data, false);

    return res.status(200).json(loginObject(user));
  };

  static profile = async (req: Request, res: Response) => {
    if (!req.user) {
      throw new Error("Code error");
    }

    return res.status(200).json(await service.getUserById(req.user.id));
  };

  static refreshTokens = async (req: Request, res: Response) => {
    const data = validator.refreshToken(req);

    const user = await refreshTokens(data.refreshToken);

    if (!user) {
      throw new SimpleError(
        400,
        "Unable to refresh your tokens with the provided refresh token."
      );
    }

    const object = loginObject(user);

    return res
      .status(200)
      .cookie("access-token", object.tokens.access, {
        path: "/",
        httpOnly: true,
      })
      .json(object);
  };
}
