import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { DessertType, Flavour, ICounterCreateProductCommand } from "src/subdomains/store/contexts";

export class CounterCreateProductCommand implements ICounterCreateProductCommand {
        
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'productId',
    })
    @IsString()
    productId: string

    //Validations (?)
    type: DessertType
    //Validations (?)
    flavour: Flavour
        
    @ApiProperty({
        example:'160',
        description:'price',
    })
    @IsNumber()
    price: number
        
    @ApiProperty({
        example:'10',
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