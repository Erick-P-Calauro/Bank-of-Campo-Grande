export class UserResponse {
  user_id: string;
  user_name: string;
  user_login: string;
  user_password: string;
  user_cpf: string;
  user_phone: string;
  user_email: string;
  created_at: Date;
  user_role: string;

  constructor(
    user_id: string,
    name: string,
    login: string,
    password: string,
    cpf: string,
    phone: string | undefined,
    email: string | undefined,
    created_at: Date,
    user_role: string,
  ) {
    this.user_id = user_id;
    this.user_name = name;
    this.user_login = login;
    this.user_password = password;
    this.user_cpf = cpf;
    this.user_phone = phone ?? '';
    this.user_email = email ?? '';
    this.created_at = created_at;
    this.user_role = user_role;
  }
}
