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
        private AccountRepository: Repository<Account>
    ){}

    public async save(account : AccountSave) {
        return this.AccountRepository.save(account);
    }

    public async findAll() {
        return await this.AccountRepository.find();
    }

    public async findAllByUserId(user_id: string)  {
        return await this.AccountRepository.findBy({account_owner: {user_id: user_id}})
    }

    public async findById(account_id: string) {
        const account = this.AccountRepository.findOneBy({account_id: account_id});

        if(account == null) {
            throw new HttpException("Account not found.", 404);
        }

        return account;
    }

    public deleteAccount(account_id: string) {
        this.AccountRepository.delete({account_id: account_id});
    }

    public async changeAccountStatus(account_id: string, newStatus: AccountStatus) {
        const account = await this.findById(account_id);
        account!.status = newStatus;

        this.AccountRepository.save(account!);
    }

}
