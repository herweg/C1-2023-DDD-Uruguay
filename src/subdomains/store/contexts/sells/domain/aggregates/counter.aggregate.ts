import { CounterDomainEntity, PosterDomainEntity, ProductDomainEntity } from "../entities";
import { CounterCreatedCounterEventPublisherBase, CounterCreatedPosterEventPublisherBase, CounterCreatedProductEventPublisherBase, CounterTurnedOffFreezerEventPublisherBase, PosterUpdatedPriceEventPublisherBase } from "../events";
import { ICounterCreateCounterCommand, ICounterCreatePosterCommand, ICounterCreateProductCommand, IPosterUpdateImageCommand, IProductUpdatePriceCommand, IProductUpdateStockCommand } from "../interfaces";
import { ICounterDomainService, IPosterDomainService, IProductDomainService } from "../services";
import { AggregateRootException } from '../../../../../../libs/sofka/exceptions/aggregate-root.exception';
import { IPosterUpdatePriceCommand } from '../interfaces/commands/counter/poster/update-price.command';
import { PosterUpdatedImageEventPublisherBase } from '../events/publishers/counter/poster/updated-image.event-publisher';
import { ProductUpdatedPriceEventPublisherBase } from '../events/publishers/counter/product/updated-price.event-publisher';
import { ProductUpdatedStockEventPublisherBase } from '../events/publishers/counter/product/updated-stock.event-publisher';
import { CounterTurnedOnFreezerEventPublisherBase } from '../events/publishers/counter/turednon-freezer.event-publisher';
import { GettedProductEventPublisherBase } from "../events/publishers/counter/getted-product.event-publisher";
import { GettedPosterEventPublisherBase } from "../events/publishers/counter/getted-poster.event-publisher";
import { IPosterUpdateTypeCommand } from "../interfaces/commands/counter/poster/update-type.command";
import { IProductUpdateTypeCommand } from "../interfaces/commands/counter/product/update-type.command";
import { ProductUpdatedExpirationEventPublisherBase } from "../events/publishers/counter/product/updated-expiration.event-publisher";
import { PosterUpdatedTypeEventPublisherBase } from "../events/publishers/counter/poster/updated-type.event-publisher";
import { ProductUpdatedTypeEventPublisherBase } from "../events/publishers/counter/product/updated-type.event-publisher";
import { IProductUpdateExpirationCommand } from "../interfaces/commands/counter/product/update-expiration.command";
import { CounterMySqlEntity, PosterMySqlEntity, ProductMySqlEntity } from "../../infrastructure";

export class CounterAggregate implements
    ICounterDomainService,
    IPosterDomainService,
    IProductDomainService {

    private readonly counterService?: ICounterDomainService
    private readonly posterService?: IPosterDomainService
    private readonly productService?: IProductDomainService

    private readonly counterCreatedCounterEventPublisherBase?: CounterCreatedCounterEventPublisherBase
    private readonly counterCreatedPosterEventPublisherBase?: CounterCreatedPosterEventPublisherBase
    private readonly counterCreatedProductEventPublisherBase?: CounterCreatedProductEventPublisherBase

    //poster
    private readonly posterUpdatedImageEventPublisherBase?: PosterUpdatedImageEventPublisherBase
    private readonly posterUpdatedPriceEventPublisherBase?: PosterUpdatedPriceEventPublisherBase
    private readonly posterUpdatedTypeEventPublisherBase?: PosterUpdatedTypeEventPublisherBase

    //product
    private readonly productUpdatedPriceEventPublisherBase?: ProductUpdatedPriceEventPublisherBase
    private readonly productUpdatedStockEventPublisherBase?: ProductUpdatedStockEventPublisherBase
    private readonly productUpdatedExpirationEventPublisherBase?: ProductUpdatedExpirationEventPublisherBase
    private readonly productUpdatedTypeEventPublisherBase?: ProductUpdatedTypeEventPublisherBase

    //freezer
    private readonly counterTurnedOffFreezerEventPublisherBase?: CounterTurnedOffFreezerEventPublisherBase
    private readonly counterTurnedOnFreezerEventPublisherBase?: CounterTurnedOnFreezerEventPublisherBase

    //getters
    private readonly gettedProductEventPublisherBase?: GettedProductEventPublisherBase
    private readonly gettedPosterEventPublisherBase?: GettedPosterEventPublisherBase

    constructor(
        {
            counterService,
            posterService,
            productService,

            counterCreatedCounterEventPublisherBase,
            counterCreatedPosterEventPublisherBase,
            counterCreatedProductEventPublisherBase,

            //poster
            posterUpdatedImageEventPublisherBase,
            posterUpdatedPriceEventPublisherBase,
            posterUpdatedTypeEventPublisherBase,

            //product
            productUpdatedPriceEventPublisherBase,
            productUpdatedStockEventPublisherBase,
            productUpdatedExpirationEventPublisherBase,
            productUpdatedTypeEventPublisherBase,

            //freezer
            counterTurnedOffFreezerEventPublisherBase,
            counterTurnedOnFreezerEventPublisherBase,

            //getters
            gettedProductEventPublisherBase,
            gettedPosterEventPublisherBase
        }: {
            counterService?: ICounterDomainService,
            posterService?: IPosterDomainService,
            productService?: IProductDomainService,

            counterCreatedCounterEventPublisherBase?: CounterCreatedCounterEventPublisherBase,
            counterCreatedPosterEventPublisherBase?: CounterCreatedPosterEventPublisherBase,
            counterCreatedProductEventPublisherBase?: CounterCreatedProductEventPublisherBase,

            //poster
            posterUpdatedImageEventPublisherBase?: PosterUpdatedImageEventPublisherBase,
            posterUpdatedPriceEventPublisherBase?: PosterUpdatedPriceEventPublisherBase,
            posterUpdatedTypeEventPublisherBase?: PosterUpdatedTypeEventPublisherBase,

            //product
            productUpdatedPriceEventPublisherBase?: ProductUpdatedPriceEventPublisherBase,
            productUpdatedStockEventPublisherBase?: ProductUpdatedStockEventPublisherBase,
            productUpdatedExpirationEventPublisherBase?: ProductUpdatedExpirationEventPublisherBase,
            productUpdatedTypeEventPublisherBase?: ProductUpdatedTypeEventPublisherBase,

            //freezer
            counterTurnedOffFreezerEventPublisherBase?: CounterTurnedOffFreezerEventPublisherBase,
            counterTurnedOnFreezerEventPublisherBase?: CounterTurnedOnFreezerEventPublisherBase,

            //getter
            gettedProductEventPublisherBase?: GettedProductEventPublisherBase,
            gettedPosterEventPublisherBase?: GettedPosterEventPublisherBase
        }
    ) {
        this.counterService = counterService,
            this.counterCreatedCounterEventPublisherBase = counterCreatedCounterEventPublisherBase,
            this.counterCreatedPosterEventPublisherBase = counterCreatedPosterEventPublisherBase,
            this.counterCreatedProductEventPublisherBase = counterCreatedProductEventPublisherBase,

            //poster
            this.posterUpdatedImageEventPublisherBase = posterUpdatedImageEventPublisherBase,
            this.posterUpdatedPriceEventPublisherBase = posterUpdatedPriceEventPublisherBase,
            this.posterUpdatedTypeEventPublisherBase = posterUpdatedTypeEventPublisherBase,

            //product
            this.productUpdatedPriceEventPublisherBase = productUpdatedPriceEventPublisherBase,
            this.productUpdatedStockEventPublisherBase = productUpdatedStockEventPublisherBase,
            this.productUpdatedExpirationEventPublisherBase = productUpdatedExpirationEventPublisherBase,
            this.productUpdatedTypeEventPublisherBase = productUpdatedTypeEventPublisherBase

        //freezer
        this.counterTurnedOffFreezerEventPublisherBase = counterTurnedOffFreezerEventPublisherBase,
            this.counterTurnedOnFreezerEventPublisherBase = counterTurnedOnFreezerEventPublisherBase

        //getters
        this.gettedProductEventPublisherBase = gettedProductEventPublisherBase,
            this.gettedPosterEventPublisherBase = gettedPosterEventPublisherBase
    }

    /**
     * Counter Methods
     *
     * @param {ICounterDomainEntity} counter
     * @return {*}  {Promise<CounterMySqlEntity>}
     * @memberof CounterAggregate
     */
    async createCounter(counter: ICounterCreateCounterCommand): Promise<CounterMySqlEntity> {
        if (!this.counterService) throw new AggregateRootException("createCounter Service not found.")
        if (!this.counterCreatedCounterEventPublisherBase) throw new AggregateRootException("Event not found.")

        const counterResult = await this.counterService.createCounter(counter)
        this.counterCreatedCounterEventPublisherBase.response = counterResult
        this.counterCreatedCounterEventPublisherBase.publish()
        return counterResult
    }

    async createPoster(poster: ICounterCreatePosterCommand): Promise<PosterMySqlEntity> {
        console.log(this.counterService);
        
        if (!this.counterService) throw new AggregateRootException("createPoster Service not found.")
        if (!this.counterCreatedPosterEventPublisherBase) throw new AggregateRootException("Event not found.")

        const posterResult = await this.counterService.createPoster(poster)
        this.counterCreatedPosterEventPublisherBase.response = posterResult
        this.counterCreatedPosterEventPublisherBase.publish()
        return posterResult
    }

    async createProduct(product: ICounterCreateProductCommand): Promise<ProductMySqlEntity> {
        if (!this.counterService) throw new AggregateRootException("createProduct Service not found")
        if (!this.counterCreatedProductEventPublisherBase) throw new AggregateRootException("Create product event not found")

        const productCreated = await this.counterService.createProduct(product)
        this.counterCreatedProductEventPublisherBase.response = productCreated
        this.counterCreatedProductEventPublisherBase.publish()
        return productCreated
    }

    async turnOffFreezer(counterId: string, turnOff: boolean): Promise<boolean> {
        if (!this.counterService) throw new AggregateRootException("turnOffFreezer CounterService not found")
        if (!this.counterTurnedOffFreezerEventPublisherBase) throw new AggregateRootException("Turned Off freezer event not found")

        const turnedOff = await this.counterService.turnOffFreezer(counterId, turnOff)
        this.counterTurnedOffFreezerEventPublisherBase.response = turnedOff
        this.counterTurnedOffFreezerEventPublisherBase.publish()
        return turnedOff
    }

    async turnOnFreezer(counterId: string, turnOn: boolean): Promise<boolean> {
        if (!this.counterService) throw new AggregateRootException("turnOnFreezer CounterService not found")
        if (!this.counterTurnedOffFreezerEventPublisherBase) throw new AggregateRootException("Turned On freezer event not found")

        const turnedOn = await this.counterService.turnOnFreezer(counterId, turnOn)
        this.counterTurnedOnFreezerEventPublisherBase.response = turnedOn
        this.counterTurnedOnFreezerEventPublisherBase.publish()
        return turnedOn
    }

    //getters
    async getPoster(posterId: string): Promise<PosterMySqlEntity> {
        if (!this.posterService) throw new AggregateRootException("getPoster CounterService not found")
        if (!this.gettedPosterEventPublisherBase) throw new AggregateRootException("getPoster event not found")

        const poster = await this.counterService.getPoster(posterId)
        this.gettedPosterEventPublisherBase.response = poster
        this.gettedPosterEventPublisherBase.publish()
        return poster
    }

    async getProduct(productId: string): Promise<ProductMySqlEntity> {
        if (!this.productService) throw new AggregateRootException("getProduct CounterService not found")
        if (!this.gettedProductEventPublisherBase) throw new AggregateRootException("getProduct event not found")

        const product = await this.counterService.getProduct(productId)
        this.gettedProductEventPublisherBase.response = product
        this.gettedProductEventPublisherBase.publish()
        return product
    }
    
    /**
     * Product Methods
     *
     * @param {IProductDomainEntity} product
     * @param {number} newStock
     * @return {*}  {ProductMySqlEntity}
     * @memberof CounterAggregate
     */
    async updateStock(product: IProductUpdateStockCommand): Promise<ProductMySqlEntity> {
        if (!this.productService) throw new AggregateRootException("updateStock service not found")
        if (!this.productUpdatedStockEventPublisherBase) throw new AggregateRootException("PRODUCT Update stock event not found")

        const stockResult = await this.productService.updateStock(product)
        this.productUpdatedStockEventPublisherBase.response = stockResult
        this.productUpdatedStockEventPublisherBase.publish()
        return stockResult
    }
    
    async updateProductPrice(product: IProductUpdatePriceCommand): Promise<ProductMySqlEntity> {
        if (!this.productService) throw new AggregateRootException("updateProductPrice service not found")
        if (!this.productUpdatedPriceEventPublisherBase) throw new AggregateRootException("Updated Price event not found")

        const priceResult = await this.productService.updateProductPrice(product)
        this.productUpdatedPriceEventPublisherBase.response = priceResult
        this.productUpdatedPriceEventPublisherBase.publish()
        return priceResult
    }

    async updateProductType(product: IProductUpdateTypeCommand): Promise<ProductMySqlEntity> {
        if (!this.productService) throw new AggregateRootException("updateProductType service not found")
        if (!this.productUpdatedTypeEventPublisherBase) throw new AggregateRootException("Updated Price event not found")

        const typeResult = await this.productService.updateProductType(product)
        this.productUpdatedTypeEventPublisherBase.response = typeResult
        this.productUpdatedTypeEventPublisherBase.publish()
        return typeResult
    }

    async updateProductExpiration(product: IProductUpdateExpirationCommand): Promise<ProductMySqlEntity> {
        if (!this.productService) throw new AggregateRootException("updateProductExpiration service not found")
        if (!this.productUpdatedExpirationEventPublisherBase) throw new AggregateRootException("Updated Price event not found")

        const expirationResult = await this.productService.updateProductExpiration(product)
        this.productUpdatedExpirationEventPublisherBase.response = expirationResult
        this.productUpdatedExpirationEventPublisherBase.publish()
        return expirationResult
    }

    /**
     * Poster Methods
     *
     * @param {IPosterDomainEntity} poster
     * @param {string} newImage
     * @return {*}  {PosterMySqlEntity}
     * @memberof CounterAggregate
     */
    async updateImage(poster: IPosterUpdateImageCommand): Promise<PosterMySqlEntity> {
        if (!this.posterService) throw new AggregateRootException("updateImage Service not found.")
        if (!this.posterUpdatedImageEventPublisherBase) throw new AggregateRootException("Event not found.")

        const imageResult = await this.posterService.updateImage(poster)
        this.posterUpdatedImageEventPublisherBase.response = imageResult
        this.posterUpdatedImageEventPublisherBase.publish()
        return imageResult
    }

    async updatePosterPrice(poster: IPosterUpdatePriceCommand): Promise<PosterMySqlEntity> {
        if (!this.posterService) throw new AggregateRootException("updatePosterPrice Service not found.")
        if (!this.posterUpdatedPriceEventPublisherBase) throw new AggregateRootException("Event not found.")

        const posterResult = await this.posterService.updatePosterPrice(poster)
        this.posterUpdatedPriceEventPublisherBase.response = posterResult
        this.posterUpdatedPriceEventPublisherBase.publish()
        return posterResult
    }

    async updatePosterType(poster: IPosterUpdateTypeCommand): Promise<PosterMySqlEntity> {
        if (!this.posterService) throw new AggregateRootException("updatePosterType service not found")
        if (!this.posterUpdatedTypeEventPublisherBase) throw new AggregateRootException("Updated Price event not found")

        const typeResult = await this.posterService.updatePosterType(poster)
        this.posterUpdatedTypeEventPublisherBase.response = typeResult
        this.posterUpdatedTypeEventPublisherBase.publish()
        return typeResult
    }
}