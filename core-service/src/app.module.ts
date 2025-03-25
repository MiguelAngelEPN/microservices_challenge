import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';
import config from './config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    DatabaseModule, 
    TransactionModule],
})
export class AppModule {}
