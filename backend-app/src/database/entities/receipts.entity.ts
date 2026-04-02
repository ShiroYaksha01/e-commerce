import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Order } from './orders.entity';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  receiptId!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  issuedAt!: Date;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @OneToOne(() => Order, (order) => order.receipt)
  order!: Order;
}