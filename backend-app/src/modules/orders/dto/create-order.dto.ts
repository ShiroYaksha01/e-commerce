import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsDateString()
  issuedAt?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsPositive()
  @Min(0)
  price!: number;
}
