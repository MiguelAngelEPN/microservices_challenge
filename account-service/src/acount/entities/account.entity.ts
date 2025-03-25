import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccountBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  accountId: string;

  @Column({ type: 'float', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ default: true })
  active: boolean;
}
