import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateClientUseCase } from "../../application/use-cases/ticket/client/create-client.use-case";
import { CreatedClientPublisher } from "../messaging/publisher/ticket/created-client.message-publisher";
import { ClientService } from "../persistence/services/client.service";
import { TicketCreateClientCommand } from "../utils/commands/ticket/client/create-client.command";

@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
        private readonly createdClientPublisher: CreatedClientPublisher,
    ) { }

    @Post("create-client")
    async createClient(@Body() command: TicketCreateClientCommand) {
        const useCase = new CreateClientUseCase(
            this.clientService,
            this.createdClientPublisher
        )
        return await useCase.execute(command)
    }
}