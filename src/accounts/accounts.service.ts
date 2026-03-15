import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './models/Account';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountSave } from './dto/AccountSave';
import { AccountStatus } from './status';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private AccountRepository: Repository<Account>,
  ) {}

  public async save(account: AccountSave) {
    return this.AccountRepository.save(account);
  }

  public async findAll() {
    return await this.AccountRepository.find();
  }

  public async findAllActiveOrPaused() {
    return await this.AccountRepository.findBy([
      {
        status: AccountStatus.active,
      },
      {
        status: AccountStatus.paused,
      },
    ]);
  }

  public async findAllActiveOrPausedByUserId(user_id: string) {
    return await this.AccountRepository.findBy([
      {
        account_owner: { user_id: user_id },
        status: AccountStatus.active,
      },
      {
        account_owner: { user_id: user_id },
        status: AccountStatus.paused,
      },
    ]);
  }

  public async findActiveOrPausedById(account_id: string) {
    const account = this.AccountRepository.findOneBy([
      {
        account_id: account_id,
        status: AccountStatus.active,
      },
      {
        account_id: account_id,
        status: AccountStatus.paused,
      },
    ]);

    if (account == null) {
      throw new HttpException('Account not found.', 404);
    }

    return account;
  }

  public async pauseAccount(account_id: string) {
    const account: Account = (await this.findActiveOrPausedById(account_id))!;

    if (account.status == AccountStatus.paused) {
      return;
    }

    account.status = AccountStatus.paused;

    await this.AccountRepository.save(account);
  }

  public async deleteAccount(account_id: string) {
    const account = (await this.findActiveOrPausedById(account_id))!;
    account.status = AccountStatus.cancelled;

    await this.AccountRepository.save(account);
  }

  public async resumeAccount(account_id: string) {
    const account = (await this.findActiveOrPausedById(account_id))!;

    if (account.status == AccountStatus.active) {
      return;
    }

    account.status = AccountStatus.active;

    await this.AccountRepository.save(account);
  }
}
