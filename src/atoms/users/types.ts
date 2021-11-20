export interface Tokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  tokens: Tokens;
  user: {
    [key: string]: any;
  };
}
