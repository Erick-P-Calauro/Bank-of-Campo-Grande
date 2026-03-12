import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { IdentityModule } from './identity/identity.module';
import { User } from './identity/models/User';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT ?? "5432"),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    TransactionsModule, 
    AuthModule, 
    AccountsModule,
    IdentityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
