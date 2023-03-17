import { IProductUpdatePriceCommand } from "src/subdomains"
import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger"

export class ProductUpdatePriceCommand implements IProductUpdatePriceCommand {
    
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'productId',
    })
    @IsString()
    productId: string
    
    @ApiProperty({
        example:'50',
        description:'newPrice',
    })
    @IsNumber()
    newPrice: number
}