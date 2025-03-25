import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Account])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
