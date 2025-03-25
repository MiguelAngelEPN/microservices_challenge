import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const accountService = process.env.ACOUNT_SERVICE;
const userService = process.env.USER_SERVICE;
@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) { }
    async createTransaction(accountId: string, amount: number, depositType: string) {
        // Validar que amount sea un número real y positivo
        if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
            return {
                message: 'El monto debe ser un número válido y mayor a 0.',
                status: 'error',
            };
        }
        // Crear la transacción en mongoBD
        const transaction = new this.transactionModel({
            transactionId: uuidv4(),
            accountId,
            amount,
            depositType,
            status: 'PENDING',
        });

        try {
            // Validar si la cuenta existe en user-service
            const userResponse = await axios.get(`${userService}/users/${accountId}`);
            //console.log('user-service: ', userResponse.data)
            if (!userResponse.data || !userResponse.data.responseData) {
                return {
                    message: 'La cuenta no existe.',
                    status: 'error',
                };
            }

            const accounts = userResponse.data.responseData.accounts;
            if (!accounts || accounts.length === 0) {
                return {
                    message: 'El usuario no tiene cuentas asociadas.',
                    status: 'error',
                };
            }

            const accountNumber = accounts[0].accountNumber;

            // Validar si la cuenta está activa en account-service
            const accountResponse = await axios.get(`${accountService}/accounts/${accountNumber}`);
            if (!accountResponse.data || !accountResponse.data.responseData.active) {
                transaction.status = 'REJECTED';
                await transaction.save();
                return {
                    message: 'La cuenta está inactiva o bloqueada.',
                    status: 'error',
                };
            }

            // Aprobar transacción y actualizar saldo
            transaction.status = 'APPROVED';
            await transaction.save();

            await axios.post(`${accountService}/accounts/deposit`, {
                accountNumber,
                amount,
            });

            return {
                message: 'Transacción realizada con éxito.',
                status: 'success',
                responseData: transaction,
            };
        } catch (error) {
            return {
                message: 'Error interno del servidor al procesar la transacción.',
                status: 'error',
                responseData: error.message,
            };
        }
    }

}
