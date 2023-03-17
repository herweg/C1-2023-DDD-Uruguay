import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { DessertType, IProductUpdateTypeCommand } from "src/subdomains/store/contexts/sells/domain"

export class ProductUpdateTypeCommand implements IProductUpdateTypeCommand {
    
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'productId',
    })
    @IsString()
    productId: string

    // validacion (?)
    type: DessertType
    
    @ApiProperty({
        example:'Chocolate',
        description:'flavour',
    })
    @IsString()
    flavour: string
    
    @ApiProperty({
        example:'99',
        description:'price',
    })
    @IsNumber()
    price: number
    
    @ApiProperty({
        example:'4',
        description:'stock',
    })
    @IsNumber()
    stock: number
    
    @ApiProperty({
        example:'https://chocolate.com',
        description:'image',
    })
    @IsString()
    image: string
}