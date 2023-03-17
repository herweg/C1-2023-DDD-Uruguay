import { PosterDomainEntity, ProductDomainEntity } from "../entities";
import { CounterCreatedCounterEventPublisherBase, CounterCreatedPosterEventPublisherBase, CounterCreatedProductEventPublisherBase, CounterTurnedOffFreezerEventPublisherBase, PosterUpdatedPriceEventPublisherBase } from "../events";
import { ICounterCreateCounterCommand, IProductUpdateStockCommand } from "../interfaces";
import { ICounterDomainService, IPosterDomainService, IProductDomainService } from "../services";
import { AggregateRootException } from '../../../../../../libs/sofka/exceptions/aggregate-root.exception';
import { PosterUpdatedImageEventPublisherBase } from '../events/publishers/counter/poster/updated-image.event-publisher';
import { ProductUpdatedPriceEventPublisherBase } from '../events/publishers/counter/product/updated-price.event-publisher';
import { ProductUpdatedStockEventPublisherBase } from '../events/publishers/counter/product/updated-stock.event-publisher';
import { CounterTurnedOnFreezerEventPublisherBase } from '../events/publishers/counter/turednon-freezer.event-publisher';
import { GettedProductEventPublisherBase } from "../events/publishers/counter/getted-product.event-publisher";
import { GettedPosterEventPublisherBase } from "../events/publishers/counter/getted-poster.event-publisher";
import { ProductUpdatedExpirationEventPublisherBase } from "../events/publishers/counter/product/updated-expiration.event-publisher";
import { PosterUpdatedTypeEventPublisherBase } from "../events/publishers/counter/poster/updated-type.event-publisher";
import { ProductUpdatedTypeEventPublisherBase } from "../events/publishers/counter/product/updated-type.event-publisher";
import { CounterMySqlEntity } from "../../infrastructure";

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
        this.posterService = posterService,
        this.productService = productService,
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

    async createPoster(poster: PosterDomainEntity): Promise<PosterDomainEntity> {        
        if (!this.posterService) throw new AggregateRootException("posterService not found.")
        if (!this.counterCreatedPosterEventPublisherBase) throw new AggregateRootException("Event not found.")

        const result = this.posterService.createPoster(poster)

        this.counterCreatedPosterEventPublisherBase.response = poster
        this.counterCreatedPosterEventPublisherBase.publish()

        return result
    }

    async createProduct(product: ProductDomainEntity): Promise<ProductDomainEntity> {
        if (!this.productService) throw new AggregateRootException("productService not found")
        if (!this.counterCreatedProductEventPublisherBase) throw new AggregateRootException("Create product event not found")

        const result = this.productService.createProduct(product)

        this.counterCreatedProductEventPublisherBase.response = product
        this.counterCreatedProductEventPublisherBase.publish()
        
        return result
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
    async getPoster(posterId: string): Promise<PosterDomainEntity> {
        if (!this.posterService) throw new AggregateRootException("getPoster CounterService not found")
        if (!this.gettedPosterEventPublisherBase) throw new AggregateRootException("getPoster event not found")

        const poster = await this.posterService.getPoster(posterId)

        this.gettedPosterEventPublisherBase.response = poster
        this.gettedPosterEventPublisherBase.publish()
        return poster
    }

    async getProduct(productId: string): Promise<ProductDomainEntity> {
        if (!this.productService) throw new AggregateRootException("getProduct CounterService not found")
        if (!this.gettedProductEventPublisherBase) throw new AggregateRootException("getProduct event not found")

        const product = await this.productService.getProduct(productId)

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
    async updateStock(product: IProductUpdateStockCommand): Promise<ProductDomainEntity> {
        if (!this.productService) throw new AggregateRootException("updateStock service not found")
        if (!this.productUpdatedStockEventPublisherBase) throw new AggregateRootException("PRODUCT Update stock event not found")

        
        const result = this.productService.updateStock(product)
        
        this.productUpdatedStockEventPublisherBase.response = product
        this.productUpdatedStockEventPublisherBase.publish()
        return result
    }
    
    async updateProductPrice(product: ProductDomainEntity): Promise<ProductDomainEntity> {        
        if (!this.productService) throw new AggregateRootException("updateProductPrice service not found")
        if (!this.productUpdatedPriceEventPublisherBase) throw new AggregateRootException("Updated Price event not found")

        const result = this.productService.updateProductPrice(product)

        this.productUpdatedPriceEventPublisherBase.response = product
        this.productUpdatedPriceEventPublisherBase.publish()
        return result
    }

    async updateProductType(product: ProductDomainEntity): Promise<ProductDomainEntity> {
        if (!this.productService) throw new AggregateRootException("updateProductType service not found")
        if (!this.productUpdatedTypeEventPublisherBase) throw new AggregateRootException("Updated Price event not found")

        const result = this.productService.updateProductType(product)

        this.productUpdatedTypeEventPublisherBase.response = product
        this.productUpdatedTypeEventPublisherBase.publish()
        return result
    }

    async updateProductExpiration(product: ProductDomainEntity): Promise<ProductDomainEntity> {
        if (!this.productService) throw new AggregateRootException("updateProductExpiration service not found")
        if (!this.productUpdatedExpirationEventPublisherBase) throw new AggregateRootException("Updated Price event not found")

        const result = this.productService.updateProductExpiration(product)

        this.productUpdatedExpirationEventPublisherBase.response = product
        this.productUpdatedExpirationEventPublisherBase.publish()
        return result
    }

    /**
     * Poster Methods
     *
     * @param {IPosterDomainEntity} poster
     * @param {string} newImage
     * @return {*}  {PosterDomainEntity}
     * @memberof CounterAggregate
     */
    async updateImage(poster: PosterDomainEntity): Promise<PosterDomainEntity> {
        if (!this.posterService) throw new AggregateRootException("updateImage Service not found.")
        if (!this.posterUpdatedImageEventPublisherBase) throw new AggregateRootException("Event not found.")

        const imageResult = await this.posterService.updateImage(poster)

        this.posterUpdatedImageEventPublisherBase.response = imageResult
        this.posterUpdatedImageEventPublisherBase.publish()
        return imageResult
    }

    async updatePosterPrice(poster: PosterDomainEntity): Promise<PosterDomainEntity> {
        if (!this.posterService) throw new AggregateRootException("updatePosterPrice Service not found.")
        if (!this.posterUpdatedPriceEventPublisherBase) throw new AggregateRootException("Event not found.")

        const posterResult = await this.posterService.updatePosterPrice(poster)

        this.posterUpdatedPriceEventPublisherBase.response = posterResult
        this.posterUpdatedPriceEventPublisherBase.publish()
        return posterResult
    }

    async updatePosterType(poster: PosterDomainEntity): Promise<PosterDomainEntity> {
        if (!this.posterService) throw new AggregateRootException("updatePosterType service not found")
        if (!this.posterUpdatedTypeEventPublisherBase) throw new AggregateRootException("Updated Price event not found")

        const typeResult = await this.posterService.updatePosterType(poster)

        this.posterUpdatedTypeEventPublisherBase.response = typeResult
        this.posterUpdatedTypeEventPublisherBase.publish()
        return typeResult
    }
}