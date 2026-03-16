import { UserRole } from 'src/auth/roles.enum.';

export class UserSave {
  user_name: string;
  user_login: string;
  user_cpf: string;
  user_password: string;
  user_phone: string;
  user_email: string;
  created_at: Date;
  user_role: string;

  constructor(
    name: string,
    login: string,
    password: string,
    cpf: string,
    phone: string | undefined,
    email: string | undefined,
    created_at: Date,
    user_role: UserRole,
  ) {
    this.user_name = name;
    this.user_login = login;
    this.user_password = password;
    this.user_cpf = cpf;
    this.user_phone = phone ?? '';
    this.user_email = email ?? '';
    this.created_at = created_at;
    this.user_role = user_role.toString();
  }
}
