import { User } from "../models/User";
import { UserRole } from '../../auth/roles';
import { UserRequest } from "./UserRequest";
import { UserResponse } from "./UserResponse";
import { UserSave } from "./UserSave";

export class UserMapper {

    static toUserSaveDto(user: UserRequest, password: string, created_at: Date, user_role: UserRole): UserSave {
        return new UserSave(user.name, password, user.cpf, user.phone, user.email, created_at, user_role);
    }

    static toUserResponseDto(user : User) : UserResponse {
        const userRoleName = user.user_role == '0' ? "manager" : "client";
        const sanitizedPhone = user.phone ?? "";
        const sanitizedEmail = user.email ?? "";

        return new UserResponse(user.user_id, user.name, user.password, user.cpf, sanitizedPhone, sanitizedEmail, user.created_at, userRoleName);
    }

}