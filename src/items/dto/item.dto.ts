import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDTO {

    @IsString()
    ProductID: string;
    
    @IsString()
    name: string;

    @IsString()
    description?: string;

    @IsString()
    image?: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock?: number;

    @IsNumber()
    CategoryID: number;
}

export class UpdateItemDTO {
    
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsNumber()
    @IsOptional()
    stock?: number;

    @IsNumber()
    @IsOptional()
    CategoryID?: number;
}