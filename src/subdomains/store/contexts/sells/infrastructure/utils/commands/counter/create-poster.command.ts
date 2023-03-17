import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { ImgType, Flavour, ICounterCreatePosterCommand } from "src/subdomains/store/contexts"

export class CounterCreatePosterCommand implements ICounterCreatePosterCommand {
    
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'posterId',
    })
    @IsString()
    posterId: string

    // Validations (?)
    type: ImgType
    // Validations (?)
    flavour: Flavour

    @ApiProperty({
        example:'150',
        description:'price',
    })
    @IsNumber()
    price: number
    
    @ApiProperty({
        example:'7',
        description:'stock',
    })
    @IsNumber()
    stock: number
    
    @ApiProperty({
        example:'https://tazita.com',
        description:'image',
    })
    @IsString()
    image: string
}