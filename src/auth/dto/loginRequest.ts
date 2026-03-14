import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {

    @ApiProperty({
        required: false,
    })
    cpf : string;

    @ApiProperty({
        required: true
    })
    login: string;

    @ApiProperty({
        required: true
    })
    password: string;

}