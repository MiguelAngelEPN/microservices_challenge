import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  accountNumber: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  user: User;
}
