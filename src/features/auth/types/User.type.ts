export type UserRole = 'superadmin' | 'admin' | 'editor' | 'user';

export const USER_ROLES = {
    SUPERADMIN: 'superadmin',
    ADMIN: 'admin',
    EDITOR: 'editor',
    USER: 'user'
} as const;

export interface IUserBackend {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUser {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;
}
