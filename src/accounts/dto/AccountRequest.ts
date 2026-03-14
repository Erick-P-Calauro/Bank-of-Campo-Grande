import { ApiProperty } from "@nestjs/swagger";

export class AccountRequest {
    @ApiProperty({
        required: true,
        maxLength: 45
    })
    account_name: string
}