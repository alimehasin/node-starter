import { Strategy, StrategyOptions } from "passport-jwt";
import { SECRET_KEY } from "../secrets";
import prisma from "../../prisma";

const options: StrategyOptions = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: (req) => {
    return req.cookies.token || null;
  },
};

const strategy = (tolerant: boolean) => {
  return new Strategy(options, async (payload, verify) => {
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (user) {
      verify(null, user);
    } else if (tolerant) {
      verify(null, null);
    } else {
      verify(null, null, "can't authenticate the user");
    }
  });
};

export const jwtStrategy = strategy(false);
export const jwtStrategyTolerant = strategy(true);
