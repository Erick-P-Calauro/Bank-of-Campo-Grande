import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/auth/roles';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (role : UserRole) => SetMetadata(ROLES_KEY, role);