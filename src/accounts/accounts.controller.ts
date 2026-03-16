import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountRequest } from './dto/AccountRequest';
import { AccountsService } from './accounts.service';
import { AccountMapper } from './dto/AccountMapper';
import { UserRole } from 'src/auth/roles.enum.';
import { AccountOwnershipGuard } from './account-ownership.guard';

import { Roles } from 'src/utils/global.decorators';
import { OwnedAccount } from './owned-account.decorator';
import { Account } from './models/Account';
import { AuthUser } from 'src/auth/auth-user.decorator';
import type { UserPayload } from 'src/auth/user-payload.type';

@Controller('/account')
export class AccountsController {
  constructor(private AccountsService: AccountsService) {}

  @Post('')
  @HttpCode(201)
  public async createAccount(
    @AuthUser() user_payload: UserPayload,
    @Body() account: AccountRequest,
  ) {
    const userId = user_payload.user_id;
    const created_at = new Date(Date.now());

    const accountToInsert = AccountMapper.toAccountSaveDto(
      account,
      userId,
      created_at,
    );
    const accountResponse = await this.AccountsService.save(accountToInsert);

    return AccountMapper.toAccountResponseDto(accountResponse);
  }

  @Get('')
  @HttpCode(200)
  public async listAccounts(@AuthUser() user_payload: UserPayload) {
    if (user_payload.user_role == UserRole.manager) {
      const accounts = await this.AccountsService.findAll();
      return accounts.map((account) =>
        AccountMapper.toAccountResponseDto(account),
      );
    }

    const accounts = await this.AccountsService.findAllActiveOrPausedByUserId(
      user_payload.user_id,
    );

    return accounts.map((account) =>
      AccountMapper.toAccountResponseDto(account),
    );
  }

  @Get(':accountId')
  @HttpCode(200)
  @UseGuards(AccountOwnershipGuard)
  public getAccountById(@OwnedAccount() account: Account) {
    return AccountMapper.toAccountResponseDto(account);
  }

  @Delete(':accountId')
  @HttpCode(204)
  @UseGuards(AccountOwnershipGuard)
  public async cancelAccount(@Param('accountId') accountId: string) {
    await this.AccountsService.deleteAccount(accountId);
  }

  @Post(':accountId/pause')
  @Roles(UserRole.manager)
  @HttpCode(204)
  public async pauseAccount(@Param('accountId') accountId: string) {
    await this.AccountsService.pauseAccount(accountId);
  }

  @Post(':accountId/resume')
  @Roles(UserRole.manager)
  @HttpCode(204)
  public async resumeAccount(@Param('accountId') accountId: string) {
    await this.AccountsService.resumeAccount(accountId);
  }
}
