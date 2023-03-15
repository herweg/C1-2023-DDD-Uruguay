import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateCounterUseCase, CreatePosterUseCase, CreateProductUseCase, GetPosterUseCase, GetProductUseCase } from "../../application";
import { GettedPosterEventPublisherBase, GettedProductEventPublisherBase } from "../../domain";
import { CreatedCounterPublisher } from "../messaging/publisher/counter/created-counter.message-publisher";
import { CreatedPosterPublisher } from "../messaging/publisher/counter/created-poster.message-publisher";
import { CreatedProductPublisher } from "../messaging/publisher/counter/created-product.message-publisher";
import { GettedPosterPublisher } from "../messaging/publisher/counter/getted-poster.message-publisher";
import { GettedProductPublisher } from "../messaging/publisher/counter/getted-product.message-publisher";
import { CounterService, PosterService, ProductService } from "../persistence/services";
import { CounterCreateCounterCommand } from "../utils/commands/counter/create-counter.command";
import { CounterCreatePosterCommand } from "../utils/commands/counter/create-poster.command";
import { CounterCreateProductCommand } from "../utils/commands/counter/create-product.command";
import { GetPosterCommand } from "../utils/commands/counter/get-poster.command";
import { GetProductCommand } from "../utils/commands/counter/get-product.command";

@Controller('counter')
export class CounterController {

    constructor(
        private readonly counterService: CounterService,
        private readonly posterService: PosterService,
        private readonly productService: ProductService,

        private readonly createdCounterPublisher: CreatedCounterPublisher,
        private readonly createdProductPublisher: CreatedProductPublisher,
        private readonly createdPosterPublisher: CreatedPosterPublisher,
        private readonly gettedPosterEventPublisher: GettedPosterPublisher,
        private readonly gettedProductEventPublisher: GettedProductPublisher

    ) { }

    @Post("/create-counter")
    async addCounter(@Body() command: CounterCreateCounterCommand) {
        const useCase = new CreateCounterUseCase(
            this.counterService,
            this.createdCounterPublisher
        )
        return await useCase.execute(command)
    }

    @Post("/create-product")
    async addProduct(@Body() command: CounterCreateProductCommand) {
        const useCase = new CreateProductUseCase(
            this.productService,
            this.createdProductPublisher
        )
        return await useCase.execute(command)
    }

    @Post("/create-poster")
    async addPoster(@Body() command: CounterCreatePosterCommand) {
        const useCase = new CreatePosterUseCase(
            this.posterService,
            this.createdPosterPublisher
        )
        return await useCase.execute(command)
    }

    @Get("/get-poster")
    async getPoster(@Body() command: GetPosterCommand) {
        const useCase = new GetPosterUseCase(
            this.posterService,
            this.gettedPosterEventPublisher
        )
        return await useCase.execute(command)
    }

    @Get("/get-product")
    async getProduct(@Body() command: GetProductCommand) {
        const useCase = new GetProductUseCase(
            this.productService,
            this.gettedProductEventPublisher
        )
        return await useCase.execute(command)
    }
}