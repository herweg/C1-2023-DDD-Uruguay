import { Body, Controller, Patch, Post } from "@nestjs/common"
import { CreatePosterUseCase } from "../../application/use-cases/counter/create-poster.use-case"
import { UpdateImageUseCase, UpdatePricePosterUseCase, UpdateTypePosterUseCase } from "../../application/use-cases/counter/poster"
import { CreatedPosterPublisher } from "../messaging/publisher/counter/created-poster.message-publisher"
import { UpdatedImagePublisher } from "../messaging/publisher/counter/poster/updated-image.message-publisher"
import { UpdatedPricePublisher } from "../messaging/publisher/counter/poster/updated-price.message-publisher"
import { UpdatedTypePublisher } from "../messaging/publisher/counter/poster/updated-type.message-publisher"
import { PosterService } from "../persistence/services"
import { CounterCreatePosterCommand } from "../utils/commands/counter/create-poster.command"
import { PosterUpdateImageCommand } from "../utils/commands/counter/poster/update-image.command"
import { PosterUpdatePriceCommand } from "../utils/commands/counter/poster/update-price.command"
import { PosterUpdateTypeCommand } from "../utils/commands/counter/poster/update-type.command"

@Controller('poster')
export class PosterController {

    constructor(
        private readonly posterService: PosterService,

        private readonly updatedImagePublisher: UpdatedImagePublisher,
        private readonly updatedPricePublisher: UpdatedPricePublisher,
        private readonly updatedTypePublisher: UpdatedTypePublisher,

        private readonly createdPosterPublisher: CreatedPosterPublisher

    ) { }

    @Post("/create-poster")
    async addPoster(@Body() command: CounterCreatePosterCommand) {
        console.log("COMMAND: " + command);

        const useCase = new CreatePosterUseCase(
            this.posterService,
            this.createdPosterPublisher
        )
        
        console.log("COMMAND EXCECUTE: " + command.flavour);
        return await useCase.execute(command)
    }

    @Patch("/updated-image")
    async updatedImage(@Body() command: PosterUpdateImageCommand) {
        const useCase = new UpdateImageUseCase(
            this.posterService,
            this.updatedImagePublisher
        )
        return await useCase.execute(command)
    }

    @Patch("/updated-price")
    async updatedPrice(@Body() command: PosterUpdatePriceCommand) {
        const useCase = new UpdatePricePosterUseCase(
            this.posterService,
            this.updatedPricePublisher
        )
        return await useCase.execute(command)
    }

    @Patch("/updated-type")
    async updatedType(@Body() command: PosterUpdateTypeCommand) {
        const useCase = new UpdateTypePosterUseCase(
            this.posterService,
            this.updatedTypePublisher
        )
        return await useCase.execute(command)
    }
}