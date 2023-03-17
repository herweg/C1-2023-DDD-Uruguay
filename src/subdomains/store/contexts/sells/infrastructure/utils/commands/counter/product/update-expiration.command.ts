import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

import { IProductUpdateExpirationCommand } from "src/subdomains/store";

export class ProductUpdateExpirationCommand implements IProductUpdateExpirationCommand {
        
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'productId',
    })
    @IsString()
    productId: string
        
    @ApiProperty({
        example:'Icecream',
        description:'type',
    })
    @IsString()
    type: string
        
    @ApiProperty({
        example:'Vanilla',
        description:'flavour',
    })
    @IsString()
    flavour: string
        
    @ApiProperty({
        example:'9',
        description:'price',
    })
    @IsNumber()
    price: number
        
    @ApiProperty({
        example:'77',
        description:'stock',
    })
    @IsNumber()
    stock: number
        
    @ApiProperty({
        example:'2023-05-27',
        description:'expirationDate',
    })
    @IsDate()
    expirationDate: Date
}