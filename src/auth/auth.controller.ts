import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/loginRequest';
import { IdentityService } from 'src/identity/identity.service';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/loginResponse';
import { Public } from 'src/utils/global.decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService,
    private IdentityService: IdentityService,
  ) {}

  @Public()
  @Post('/login')
  @HttpCode(200)
  public async login(@Body() loginRequest: LoginRequest) {
    const user = loginRequest.login
      ? await this.IdentityService.findByLogin(loginRequest.login)
      : loginRequest.cpf
        ? await this.IdentityService.findByCpf(loginRequest.cpf)
        : null;
    const isValid: boolean =
      user == null
        ? false
        : await bcrypt.compare(loginRequest.password, user.user_password);

    if (!isValid) {
      throw new HttpException(
        'Incorrect credentials.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return new LoginResponse(
      await this.AuthService.login(
        user!.user_id,
        user!.user_name,
        user!.user_role,
      ),
    );
  }
}
