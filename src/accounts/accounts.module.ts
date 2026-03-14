import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './models/Account';
import { IdentityService } from 'src/identity/identity.service';
import { User } from 'src/identity/models/User';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User])],
  controllers: [AccountsController],
  providers: [AccountsService, IdentityService]
})
export class AccountsModule {}
