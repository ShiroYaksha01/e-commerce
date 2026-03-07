import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    receiptId: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    issuedAt: Date;

}