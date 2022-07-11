import type { Handler } from 'express';
import passport from 'passport';
import { translate } from '../utils/i18n';

interface AuthenticationParams {
  tolerant?: boolean;
}

const authenticate = ({ tolerant = false }: AuthenticationParams = {}) => {
  const handler: Handler = (req, res, next) => {
    const t = translate(req);

    passport.authenticate(
      tolerant ? 'jwt-tolerant' : 'jwt',
      { session: false },
      (error, user, info) => {
        if (error) {
          return res.status(500).json({
            detail: t('serverError'),
          });
        }

        if (!user && !tolerant) {
          return res.status(401).json({ detail: t('authFailed') });
        }

        req.user = user;

        return next();
      }
    )(req, res, next);
  };

  return handler;
};

export default authenticate;
