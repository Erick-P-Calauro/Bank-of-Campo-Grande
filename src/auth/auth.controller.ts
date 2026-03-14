import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/loginRequest';
import { IdentityService } from 'src/identity/identity.service';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/loginResponse';
import { Public } from 'src/utils/global.decorators';

@Controller('auth')
export class AuthController {

    constructor(private AuthService : AuthService, private IdentityService: IdentityService){}

    @Public()
    @Post('/login')
    @HttpCode(200)
    public async login(@Body() loginRequest: LoginRequest) {

        const user = await this.IdentityService.findByCpf(loginRequest.cpf);

        if(!bcrypt.compare(loginRequest.password, user.password)) {
            throw new HttpException("Incorrect credentials.", HttpStatus.UNAUTHORIZED);
        }

        return new LoginResponse(await this.AuthService.login(user.user_id, user.name));
    }

}
