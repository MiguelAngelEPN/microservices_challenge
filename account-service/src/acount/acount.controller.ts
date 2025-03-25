import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountService } from './acount.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  getAccount(@Param('id') id: string) {
    return this.accountService.getAccount(id);
  }

  @Post('/deposit')
  deposit(@Body() data: { accountId: string; amount: number }) {
    return this.accountService.deposit(data.accountId, data.amount);
  }
}
