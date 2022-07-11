// Permissions
export type Action = 'read' | 'create' | 'update' | 'delete' | 'manage';
export type Subject = 'User' | 'all';

export type Environment = 'development' | 'staging' | 'production';

export type TranslationFn = (key: string) => string;

export type PaginatedResponse<T> = {
  totalRows: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: T[];
};

export interface PaginationQuery {
  page: number;
  pageSize: number;
  [key: string]: any;
}
