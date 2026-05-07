import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field(() => ID)
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  categoryId: number;
}
