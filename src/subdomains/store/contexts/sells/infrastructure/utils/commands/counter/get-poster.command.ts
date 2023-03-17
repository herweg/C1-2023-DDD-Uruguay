import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IGetPosterCommand } from "src/subdomains/store/contexts";

export class GetPosterCommand implements IGetPosterCommand {
            
    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'posterId',
    })
    @IsString()
    posterId: string
}