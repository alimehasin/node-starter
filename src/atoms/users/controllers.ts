import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as schemas from "./schemas";
import * as services from "./services";
import { signAccessToken } from "./helpers";
import { SimpleError } from "../../utils";
import { translate } from "../../utils/i18n";

export const login = async (req: Request, res: Response) => {
  const data = schemas.login.parse(req.body);

  const user: any = await services.getUserByUsername(data.username, false);

  // Check for password
  if (!user || !bcrypt.compareSync(data.password, user.password)) {
    throw new SimpleError(400, translate(req, "loginFailed"));
  }

  const accessToken = signAccessToken(user.id);
  const reshapedUser = services.reshape(user, true);

  // Response
  return res
    .status(200)
    .cookie("access-token", accessToken, { path: "/", httpOnly: true })
    .cookie("user", JSON.stringify(reshapedUser), { path: "/", httpOnly: true })
    .json({ accessToken, user: reshapedUser });
};

export const signup = async (req: Request, res: Response) => {
  const data = await schemas.signup.parseAsync(req.body);

  const user = await services.createUser(data);

  return res.status(200).json(user);
};

export const profile = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new SimpleError(500, translate(req, "serverError"));
  }

  const user = await services.getUserById(req.user.id);

  return res.status(200).json(user);
};
