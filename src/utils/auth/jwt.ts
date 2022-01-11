import { Request } from "express";
import { Strategy } from "passport-strategy";
import { flow } from "lodash/fp";
import jwt from "jsonwebtoken";
import { SimpleError } from "..";
import * as secrets from "../secrets";
import prisma from "../../../prisma";

const getAccessJwtFromHeaders = (req: Request): string | null => {
  // 1. Get the authorization header
  const auth = req.headers.authorization;

  // 2. Ensure valid format
  if (!auth || !auth.startsWith("Bearer")) {
    return null;
  }

  // 3. Delete "Bearer "
  const token = auth.replace("Bearer ", "");

  // 4. Return token
  return token;
};

const getAccessJwtFromCookies = (req: Request): string => {
  return req.cookies["access-token"];
};

const getAccessJwt = (req: Request): string | null => {
  return getAccessJwtFromHeaders(req) || getAccessJwtFromCookies(req);
};

const verifyAccessJwtForAuth = (token: string): string => {
  const payload: any = jwt.verify(token, secrets.SECRET_KEY);

  if (payload.type !== "ACCESS") {
    throw new SimpleError(400, "Unable to login with the provided credentials.");
  }

  return payload.id;
};

const getUser = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

const authenticate = async (req: Request) => {
  return flow(getAccessJwt, verifyAccessJwtForAuth, getUser)(req);
};

class BaseJwtStrategy extends Strategy {
  tolerant: boolean;

  constructor(tolerant: boolean) {
    super();
    this.tolerant = tolerant;
  }

  // eslint-disable-next-line no-unused-vars
  async authenticate(req: Request, options?: any) {
    try {
      this.success(await authenticate(req));
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      this.tolerant ? this.success(null) : this.fail(null, 401);
    }
  }
}

export const jwtStrategy = new BaseJwtStrategy(false);
export const jwtStrategyTolerant = new BaseJwtStrategy(true);
