import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post()
    create(@Body() data: { accountId: string; amount: number; depositType: string }) {
        return this.transactionService.createTransaction(data.accountId, data.amount, data.depositType);
    }
}
