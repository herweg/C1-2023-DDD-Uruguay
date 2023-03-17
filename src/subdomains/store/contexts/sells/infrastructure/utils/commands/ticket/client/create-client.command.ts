import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
import { IClientCreateClientCommand } from "src/subdomains/store/contexts/sells/domain/interfaces/commands/ticket/client/create-client.command"

export class TicketCreateClientCommand implements IClientCreateClientCommand {
    @ApiProperty({
        example: '7b438d25-dc5c-4781-8d2c-72f80addd7f7',
        description: 'clientId',
    })
    @IsString()
    clientId: string

    @ApiProperty({
        example: 'Roberto',
        description: 'name',
    })
    @IsString()
    name: string

    @ApiProperty({
        example: '099456789',
        description: 'phone',
    })
    @IsNumber()
    phone: number

}