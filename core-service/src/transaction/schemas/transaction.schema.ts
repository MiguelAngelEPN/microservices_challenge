import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
    @Prop({ required: true, unique: true })
    transactionId: string;

    @Prop({ required: true })
    accountId: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true, enum: ['CASH', 'WEB', 'APP'] })
    depositType: string;

    @Prop({ required: true, enum: ['PENDING', 'REJECTED', 'APPROVED'], default: 'PENDING' })
    status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
