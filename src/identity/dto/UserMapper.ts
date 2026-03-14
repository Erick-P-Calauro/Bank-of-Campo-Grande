import { User } from "../models/User";
import { UserRole } from '../../auth/roles';
import { UserRequest, UserUpdate } from "./UserRequest";
import { UserResponse } from "./UserResponse";
import { UserSave } from "./UserSave";

export class UserMapper {

    static toUserSaveDto(user: UserRequest, password: string, created_at: Date, user_role: UserRole): UserSave {
        return new UserSave(user.name, user.login, password, user.cpf, user.phone, user.email, created_at, user_role);
    }

    static toUpdateUserSaveDto(user: UserUpdate, password: string | undefined) {
        
        // Editable fields
        const name = user.name ?? undefined;
        const login = user.login ?? undefined;
        const n_password = password ?? undefined;
        const phone = user.phone ?? undefined;
        const email = user.email ?? undefined;

        // Uneditable fields;
        const cpf = undefined;
        const created_at = undefined;
        const user_role = undefined;
        
        return new UserSave(name, login, n_password, cpf, phone, email, created_at, user_role);
    }

    static toUserResponseDto(user : User) : UserResponse {
        const userRoleName = user.user_role == '0' ? "manager" : "client";
        const sanitizedPhone = user.phone ?? "";
        const sanitizedEmail = user.email ?? "";

        return new UserResponse(user.user_id, user.name, user.login, user.password, user.cpf, sanitizedPhone, sanitizedEmail, user.created_at, userRoleName);
    }

}