import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
import { IPosterUpdateImageCommand } from "../../../../../domain/interfaces/commands/counter/poster/update-image.command"

export class PosterUpdateImageCommand implements IPosterUpdateImageCommand{
            
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'posterId',
    })
    @IsString()
    posterId: string
            
    @ApiProperty({
        example:'JPG',
        description:'type',
    })
    @IsString()
    type: string
            
    @ApiProperty({
        example:'Strawberry',
        description:'flavour',
    })
    @IsString()
    flavour: string
            
    @ApiProperty({
        example:'47',
        description:'price',
    })
    @IsNumber()
    price: number
            
    @ApiProperty({
        example:'615',
        description:'stock',
    })
    @IsNumber()
    stock: number
            
    @ApiProperty({
        example:'https://microphone.com',
        description:'image',
    })
    @IsString()
    image: string
}