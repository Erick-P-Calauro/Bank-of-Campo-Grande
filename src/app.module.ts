import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    TransactionsModule, 
    AuthModule, 
    AccountsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
