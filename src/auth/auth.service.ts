import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService) {}

  public async login(userId: string, userName: string, user_role: string) {
    const payload = {
      user_id: userId,
      user_name: userName,
      user_role: user_role,
    };

    return await this.JwtService.signAsync(payload);
  }
}
