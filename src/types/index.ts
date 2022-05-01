// Permissions
export type Action = 'read' | 'create' | 'update' | 'delete' | 'manage';
export type Subject = 'User' | 'all';

export type Environment = 'development' | 'staging' | 'production';

export type TranslationFn = (key: string) => string;
