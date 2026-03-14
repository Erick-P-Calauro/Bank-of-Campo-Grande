import { ApiProperty, PartialType } from "@nestjs/swagger";
import { UserRole } from "src/auth/roles";

export class UserRequest {
    @ApiProperty({
        required: true
    })
    name: string;

    @ApiProperty({
        required: true
    })
    login: string;

    @ApiProperty({
        required : true
    })
    password: string;

    @ApiProperty({
        description: "user cpf (only numbers)",
        required: true,
    })
    cpf: string;

    @ApiProperty({
        description: "phone number with ddd (only numbers)",
        required: false,
    })
    phone: string;

    @ApiProperty({
        description: "user email",
        required:  false,
    })
    email: string;
}

export class UserUpdate extends PartialType(UserRequest) {}