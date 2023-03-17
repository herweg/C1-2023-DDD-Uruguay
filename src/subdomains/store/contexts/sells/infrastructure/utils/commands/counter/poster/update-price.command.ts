import { IPosterUpdatePriceCommand } from "src/subdomains/store/contexts/sells/domain/interfaces"
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class PosterUpdatePriceCommand implements IPosterUpdatePriceCommand{
                
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'posterId',
    })
    @IsString()
    posterId: string
                
    @ApiProperty({
        example:'120',
        description:'newPrice',
    })
    @IsNumber()
    newPrice: number
}