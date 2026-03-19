import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn('uuid')
    receiptId: string;

    @Column({length: 100})
    name: string;

    @Column()
    price: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    issuedAt: Date;

}