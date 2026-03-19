import {IsDateString, IsNotEmpty, IsNumber, IsString, Min, IsPositive, IsOptional} from 'class-validator';

export class CreateReceiptDto {

    @IsOptional()
    @IsDateString()
    issuedAt: Date;

    @IsString()
    @IsNotEmpty()
    name: string;


    @IsNumber()
    @IsPositive()
    @Min(0)
    price: number;

}

