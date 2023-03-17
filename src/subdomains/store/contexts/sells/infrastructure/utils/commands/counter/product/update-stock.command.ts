import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
import { IProductUpdateStockCommand } from "src/subdomains/store/contexts/sells/domain"

export class ProductUpdateStockCommand implements IProductUpdateStockCommand{
 
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'productId',
    })
    @IsString()
    productId: string

    @ApiProperty({
        example:'99',
        description:'stock',
    })
    @IsNumber()
    stock: number
}