const pe = process.env;

if (!pe.SECRET_KEY || !pe.DATABASE_URL) {
  throw new Error("Please provide SECRET_KEY and DATABASE_URL envs.");
}

export const { SECRET_KEY, DATABASE_URL } = pe;

export const PORT = pe.PORT || 3000;

export const ENVIRONMENT = (pe.ENVIRONMENT as Environment) || "production";

export const JWT_ACCESS_TOKEN_LIFETIME = pe.JWT_ACCESS_TOKEN_LIFETIME || "1h";

export const JWT_REFRESH_TOKEN_LIFETIME = pe.JWT_REFRESH_TOKEN_LIFETIME || "1d";
