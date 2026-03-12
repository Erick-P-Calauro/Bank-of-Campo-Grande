import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/User';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [IdentityService],
    controllers: [IdentityController]
})
export class IdentityModule {}
