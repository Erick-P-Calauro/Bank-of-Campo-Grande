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
import { AccountStatus } from './status';

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

    const accounts = await this.AccountsService.findAllByUserId(user.user_id);

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

  // Decidir se vai ser deletada ou cancelada para auditoria
  // Decidir as implicações de cancelar uma conta no sistema
  @Delete(':accountId')
  @HttpCode(204)
  @UseGuards(AccountOwnershipGuard)
  public deleteAccount(@Param('accountId') accountId: string) {
    this.AccountsService.deleteAccount(accountId);
  }

  @Post(':accountId/pause')
  @Roles(UserRole.manager)
  @HttpCode(204)
  public async pauseAccount(@Param('accountId') accountId: string) {
    await this.AccountsService.changeAccountStatus(
      accountId,
      AccountStatus.paused,
    );
  }

  @Post(':accountId/cancel')
  @Roles(UserRole.manager)
  @HttpCode(204)
  public async cancelAccount(@Param('accountId') accountId: string) {
    await this.AccountsService.changeAccountStatus(
      accountId,
      AccountStatus.cancelled,
    );
  }
}
