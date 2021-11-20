import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import Service from "./service";
import { LoginResponse } from "./types";
import prisma from "../../prisma";
import { secrets, SimpleError } from "../../utils";

export const loginObject = (user: User): LoginResponse => ({
  tokens: {
    access: jwt.sign({ id: user.id, type: "ACCESS" }, secrets.SECRET_KEY, {
      expiresIn: secrets.JWT_ACCESS_TOKEN_LIFETIME,
    }),

    refresh: jwt.sign({ id: user.id, type: "REFRESH" }, secrets.SECRET_KEY, {
      expiresIn: secrets.JWT_REFRESH_TOKEN_LIFETIME,
    }),
  },
  user: Service.reshape(user),
});

export const refreshTokens = async (token: string): Promise<User | null> => {
  const payload: any = jwt.verify(token, secrets.SECRET_KEY);

  if (payload.type !== "REFRESH") {
    throw new SimpleError(
      400,
      "Unable to refresh your tokens with the provided refresh token."
    );
  }

  return prisma.user.findUnique({ where: { id: payload.id } });
};
