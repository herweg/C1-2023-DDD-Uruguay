import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ICounterCreateCounterCommand } from "src/subdomains/store/contexts";

export class CounterCreateCounterCommand implements ICounterCreateCounterCommand{

    @ApiProperty({
        example:'e87e8633-149a-463d-be66-ce23ce69bb4a',
        description:'CounterId',
    })
    @IsString()
    counterId: string

    @ApiProperty({
        example:'7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description:'productId',
    })
    @IsString()
    productId: string

    @ApiProperty({
        example:'059753d0-cae0-425e-9995-5efb14216a15',
        description:'posterId',
    })
    @IsString()
    posterId: string
}