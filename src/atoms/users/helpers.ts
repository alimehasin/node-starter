import jwt from 'jsonwebtoken';
import { SECRET_KEY, JWT_ACCESS_TOKEN_LIFETIME } from '../../utils/secrets';

export const signAccessToken = (id: string) => {
  const accessToken = jwt.sign({ id, type: 'ACCESS' }, SECRET_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
  });

  return accessToken;
};
