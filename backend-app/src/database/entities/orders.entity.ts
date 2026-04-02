import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Receipt } from './receipts.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  issuedAt!: Date;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @OneToOne(() => Receipt, (receipt) => receipt.order, { cascade: true })
  @JoinColumn()
  receipt!: Receipt;
}