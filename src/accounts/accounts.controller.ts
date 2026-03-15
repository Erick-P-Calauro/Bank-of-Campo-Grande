import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountRequest } from './dto/AccountRequest';
import { AccountsService } from './accounts.service';
import { AccountMapper } from './dto/AccountMapper';
import { UserRole } from 'src/auth/roles';
import { AccountOwnershipGuard } from './account.ownership.guard';

import { Roles } from 'src/utils/global.decorators';

@Controller('/account')
export class AccountsController {
  constructor(private AccountsService: AccountsService) {}

  @Post('')
  @HttpCode(201)
  public async createAccount(
    @Req() req: Request,
    @Body() account: AccountRequest,
  ) {
    const userId = req['user'].user_id;
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
  public async listAccounts(@Req() req: Request) {
    const user = req['user'];

    if (user.user_role == UserRole.manager) {
      const accounts = await this.AccountsService.findAll();
      return accounts.map((account) =>
        AccountMapper.toAccountResponseDto(account),
      );
    }

    const accounts = await this.AccountsService.findAllActiveByUserId(
      user.user_id,
    );

    return accounts.map((account) =>
      AccountMapper.toAccountResponseDto(account),
    );
  }

  @Get(':accountId')
  @HttpCode(200)
  @UseGuards(AccountOwnershipGuard)
  public getAccountById(@Req() req: Request) {
    const account = req['account'];

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
}
