import { IsOptional, IsDateString, IsNumber, IsString, Min } from 'class-validator'

export class UpdateReceiptDto{
    @IsOptional()
    @IsDateString()
    issuedAt?: Date;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
}