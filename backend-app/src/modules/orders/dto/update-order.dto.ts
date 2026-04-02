import {
  IsDateString,
  IsNumber,
  IsString,
  IsPositive,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsDateString()
  issuedAt?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  price?: number;
}
