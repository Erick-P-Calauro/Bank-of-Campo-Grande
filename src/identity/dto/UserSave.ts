export class UserSave  {
    name: string;
    login: string;
    cpf: string;
    password: string;
    phone: string;
    email: string;
    created_at: Date;
    user_role: string;

    constructor(name, login, password, cpf, phone, email, created_at, user_role) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.cpf = cpf;
        this.phone = phone;
        this.email = email;
        this.created_at = created_at;
        this.user_role = user_role;
    }
}