import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountBalance } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(AccountBalance) private accountRepo: Repository<AccountBalance>) { }

  async getAccount(accountId: string) {
    console.log('Llegó a get de account-service: ', accountId);
    try {
      const account = await this.accountRepo.findOne({ where: { accountId } });

      if (!account) {
        return {
          message: 'Cuenta no encontrada',
          status: 'error',
          responseData: null
        };
      }

      return {
        message: 'Cuenta encontrada',
        status: 'success',
        responseData: account
      };
    } catch (error) {
      return {
        message: 'Error al obtener la cuenta',
        status: 'error',
        responseData: null
      };
    }
  }

  async deposit(accountId: string, amount: number) {
    try {
      const account = await this.getAccount(accountId);

      if (account.status === 'error') {
        return account; // Devuelve la respuesta estandarizada de error si la cuenta no existe
      }

      account.responseData.balance += amount;
      await this.accountRepo.save(account.responseData);

      return {
        message: 'Depósito realizado con éxito',
        status: 'success',
        responseData: account.responseData
      };
    } catch (error) {
      return {
        message: 'Error al realizar el depósito',
        status: 'error',
        responseData: null
      };
    }
  }

}
