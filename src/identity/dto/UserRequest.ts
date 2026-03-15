import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UserRequest {
  @ApiProperty({
    required: true,
  })
  user_name: string;

  @ApiProperty({
    required: true,
  })
  user_login: string;

  @ApiProperty({
    required: true,
  })
  user_password: string;

  @ApiProperty({
    description: 'user cpf (only numbers)',
    required: true,
  })
  user_cpf: string;

  @ApiProperty({
    description: 'phone number with ddd (only numbers)',
    required: false,
  })
  user_phone: string;

  @ApiProperty({
    description: 'user email',
    required: false,
  })
  user_email: string;
}

export class UserUpdate extends PartialType(UserRequest) {}
