import { ApiProperty } from "@nestjs/swagger";

export class UserRequest {
    @ApiProperty({
        description: "user name",
        required: true
    })
    name: string;

    @ApiProperty({
        description: "cpf of user without dots",
        required: true,
        maxLength: 11,
        minLength: 11,
        example: "11122233344"
    })
    cpf: string;

    @ApiProperty({
        description: "phone number with ddd",
        required: false,
        maxLength: 11,
        minLength: 11,
        example: "67111122224"
    })
    phone: string;
}