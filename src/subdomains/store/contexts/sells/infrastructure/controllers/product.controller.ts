import { Body, Controller, Patch, Post } from "@nestjs/common";
import { UpdateExpirationProductUseCase, UpdatePriceProductUseCase, UpdateStockProductUseCase, UpdateTypeProductUseCase } from "../../application/use-cases/counter/product";
import { UpdatedPricePublisher } from "../messaging/publisher/counter/product/updated-price.message-publisher";
import { UpdatedTypePublisher } from "../messaging/publisher/counter/product/updated-type.message-publisher";
import { UpdatedExpirationPublisher } from "../messaging/publisher/counter/product/updated-expiration.message-publisher";
import { UpdatedStockPublisher } from "../messaging/publisher/counter/product/updated-stock.message-publisher";
import { CounterService, PosterService, ProductService } from "../persistence/services";
import { ProductUpdateExpirationCommand } from "../utils/commands/counter/product/update-expiration.command";
import { ProductUpdatePriceCommand } from "../utils/commands/counter/product/update-price.command";
import { ProductUpdateStockCommand } from "../utils/commands/counter/product/update-stock.command";
import { ProductUpdateTypeCommand } from "../utils/commands/counter/product/update-type.command";
import { CounterCreateProductCommand } from "../utils/commands/counter/create-product.command";
import { CreateProductUseCase } from "../../application/use-cases/counter/create-product.use-case";
import { CreatedProductPublisher } from "../messaging/publisher/counter/created-product.message-publisher";

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly counterService: CounterService,
        
        private readonly createdProductPublisher: CreatedProductPublisher,
        private readonly updatedExpirationPublisher: UpdatedExpirationPublisher,
        private readonly updatedPricePublisher: UpdatedPricePublisher,
        private readonly updatedStockPublisher: UpdatedStockPublisher,
        private readonly updatedTypePublisher: UpdatedTypePublisher
    ) {}
        
    @Post("/create-product")
    async addProduct(@Body() command: CounterCreateProductCommand) {
        const useCase = new CreateProductUseCase(
            this.productService,
            this.createdProductPublisher
        )
        return await useCase.execute(command)
    }

    @Patch("/updated-expiration")
    async updatedExpiration(@Body() command: ProductUpdateExpirationCommand) {
        const useCase = new UpdateExpirationProductUseCase(
            this.productService,
            this.updatedExpirationPublisher
        )
        return await useCase.execute(command)
    }

    @Patch("/updated-price")
    async updatedPrice(@Body() command: ProductUpdatePriceCommand) {
        const useCase = new UpdatePriceProductUseCase(
            this.productService,
            this.updatedPricePublisher
        )
        return await useCase.execute(command)
    }
    
    @Patch("/updated-stock")
    async updatedStock(@Body() command: ProductUpdateStockCommand) {
        const useCase = new UpdateStockProductUseCase(
            this.productService,
            this.updatedStockPublisher
        )
        return await useCase.execute(command)
    }
    
    @Patch("/updated-type")
    async updatedType(@Body() command: ProductUpdateTypeCommand) {
        const useCase = new UpdateTypeProductUseCase(
            this.productService,
            this.updatedTypePublisher
        )
        return await useCase.execute(command)
    }
}