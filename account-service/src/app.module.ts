import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AcountModule } from './acount/acount.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    DatabaseModule, 
    AcountModule],
})
export class AppModule {}
