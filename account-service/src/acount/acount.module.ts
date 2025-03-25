import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './acount.controller';
import { AccountService } from './acount.service';
import { AccountBalance } from './entities/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AccountBalance])],
    controllers: [AccountController],
    providers: [AccountService],
})
export class AcountModule {}
