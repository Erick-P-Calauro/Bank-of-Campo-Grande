import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule, SwaggerDocumentOptions } from '@nestjs/swagger';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions : SwaggerDocumentOptions = {
    include: [
      TransactionsModule,
      AuthModule,
      AccountsModule
    ]
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Bank of Campo Grande")
    .setVersion("1.0.0")
    .build()
  
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);

  console.log("[SERVER] - Server runnning at: http://localhost:3001 ");
  console.log("[SERVER] - Docs available at : http://localhost:3001/api ")
}

bootstrap();
