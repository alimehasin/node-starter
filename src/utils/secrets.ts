import { Environment } from '../types';

const pe = process.env;

if (!pe.SECRET_KEY || !pe.DATABASE_URL) {
  throw new Error('Please provide SECRET_KEY and DATABASE_URL envs.');
}

export const PORT = pe.PORT || 3000;

export const ENVIRONMENT = (pe.ENVIRONMENT as Environment) || 'production';

export const JWT_ACCESS_TOKEN_LIFETIME = pe.JWT_ACCESS_TOKEN_LIFETIME || '1h';

// Client
export const CLIENT_PROTOCOL = pe.CLIENT_PROTOCOL || 'http';
export const CLIENT_DOMAIN = pe.CLIENT_ORIGIN || 'localhost:3000';
export const CLIENT_ORIGIN = `${CLIENT_PROTOCOL}://${CLIENT_DOMAIN}`;

// Pagination
export const PAGE_SIZE = parseInt(pe.PAGE_SIZE as string, 10) || 25;

export const { SECRET_KEY, DATABASE_URL } = pe;
