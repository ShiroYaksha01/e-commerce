import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './categories.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal')
  price!: number;

  @Column()
  categoryId!: number;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;
}
