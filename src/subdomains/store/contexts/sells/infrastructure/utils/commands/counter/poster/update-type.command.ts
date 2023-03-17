import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, isNumber, IsString } from 'class-validator'
import { IPosterUpdateTypeCommand } from 'src/subdomains/store/contexts/sells/domain/interfaces'
import { ImgType } from 'src/subdomains/store/contexts/sells/domain/value-objects'

export class PosterUpdateTypeCommand implements IPosterUpdateTypeCommand{
                    
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'posterId',
    })
    @IsString()
    posterId: string

    // Validacion (?)
    type: ImgType
                    
    @ApiProperty({
        example:'Chocolate',
        description:'flavour',
    })
    @IsString()
    flavour: string
                    
    @ApiProperty({
        example:'790',
        description:'price',
    })
    @IsNumber()
    price: number
                    
    @ApiProperty({
        example:'11',
        description:'stock',
    })
    @IsNumber()
    stock: number
                    
    @ApiProperty({
        example:'https://icecreamfactory.com',
        description:'image',
    })
    @IsString()
    image: string
}