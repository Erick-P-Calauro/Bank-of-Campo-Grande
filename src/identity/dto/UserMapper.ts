import { User } from '../models/User';
import { UserRole } from '../../auth/roles';
import { UserRequest, UserUpdate } from './UserRequest';
import { UserResponse } from './UserResponse';
import { UserSave } from './UserSave';

export class UserMapper {
  static toUserSaveDto(
    user: UserRequest,
    user_password: string,
    created_at: Date,
    user_role: UserRole,
  ): UserSave {
    return new UserSave(
      user.user_name,
      user.user_login,
      user_password,
      user.user_cpf,
      user.user_phone,
      user.user_email,
      created_at,
      user_role,
    );
  }

  static toUpdateUserSaveDto(user: UserUpdate, password: string | undefined) {
    // Editable fields
    const name = user.user_name ?? undefined;
    const login = user.user_login ?? undefined;
    const n_password = password ?? undefined;
    const phone = user.user_phone ?? undefined;
    const email = user.user_email ?? undefined;

    // Uneditable fields;
    const cpf = undefined;
    const created_at = undefined;
    const user_role = undefined;

    return new UserUpdate(
      name,
      login,
      n_password,
      cpf,
      phone,
      email,
      created_at,
      user_role,
    );
  }

  static toUserResponseDto(user: User): UserResponse {
    const userRoleName = user.user_role == '0' ? 'manager' : 'client';
    const sanitizedPhone = user.user_phone ?? '';
    const sanitizedEmail = user.user_email ?? '';

    return new UserResponse(
      user.user_id,
      user.user_name,
      user.user_login,
      user.user_password,
      user.user_cpf,
      sanitizedPhone,
      sanitizedEmail,
      user.created_at,
      userRoleName,
    );
  }
}
