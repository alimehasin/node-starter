import type { Handler } from 'express';
import passport from 'passport';

const authenticate = (tolerant = false) => {
  const handler: Handler = (req, res, next) => {
    passport.authenticate(
      tolerant ? 'jwt-tolerant' : 'jwt',
      { session: false },
      (error, user, info) => {
        if (error) {
          return res.status(500).json({
            detail: 'We have some error in our authentication system please report this',
          });
        }

        if (!user && !tolerant) {
          return res.status(401).json({ detail: 'Unable to authenticate the user' });
        }

        req.user = user;

        return next();
      }
    )(req, res, next);
  };

  return handler;
};

export default authenticate;
