import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IdentityService } from 'src/identity/identity.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/identity/models/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' }
    })
  ],
  providers: [AuthService, IdentityService],
  controllers: [AuthController]
})
export class AuthModule {}
