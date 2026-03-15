import { UserRole } from 'src/auth/roles';

export type UserPayload = {
  user_id: string;
  user_name: string;
  user_role: UserRole;
};
