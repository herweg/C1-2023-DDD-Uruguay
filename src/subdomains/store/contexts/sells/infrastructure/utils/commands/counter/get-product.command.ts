import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IGetProductCommand } from "src/subdomains/store/contexts";

export class GetProductCommand implements IGetProductCommand {
                
    @ApiProperty({
        example:'d7d3134a-a4bc-4395-8932-3d793b9dcab2',
        description:'productId',
    })
    @IsString()
    productId: string
}