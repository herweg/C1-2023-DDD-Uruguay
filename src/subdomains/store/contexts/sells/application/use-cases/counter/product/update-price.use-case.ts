import { IdValueObject, IProductDomainEntity, IProductDomainService, IProductUpdatedPriceResponse, PriceValueObject } from '../../../../domain';
import { IProductUpdatePriceCommand } from '../../../../domain';
import { ValueObjectErrorHandler, ValueObjectException } from 'src/libs';
import { IUseCase } from '../../../../../../../../libs/sofka/interface/use-case.interface';
import { CounterAggregate } from '../../../../domain/aggregates/counter.aggregate';
import { ProductUpdatedPriceEventPublisherBase } from '../../../../domain/events/publishers/counter/product/updated-price.event-publisher';
import { ProductDomainEntity } from '../../../../domain/entities/product/product.domain-entity';

export class UpdatePriceProductUseCase<
    Command extends IProductUpdatePriceCommand = IProductUpdatePriceCommand,
    Response extends IProductUpdatedPriceResponse = IProductUpdatedPriceResponse>

    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly productService: IProductDomainService,
        private readonly productUpdatedPriceEventPublisherBase: ProductUpdatedPriceEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            productService,
            productUpdatedPriceEventPublisherBase
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    private executeCommand(command: Command): Promise<ProductDomainEntity> {
        const valueObject = this.createValueObject(command)
        this.validateValueObject(valueObject)
        const product = this.createEntityPrductUpdatedDomain(valueObject)
        return this.executeProductUpdatedAggregateRoot(product)
    }

    private createValueObject(command: Command): IProductDomainEntity {
        const productId = new IdValueObject(command.productId)
        const price = new PriceValueObject(command.newPrice)

        return {
            productId,
            price,
        }
    }

    private validateValueObject(valueObject: IProductDomainEntity): void {
        const { productId, price } = valueObject

        if (productId instanceof IdValueObject && productId.hasErrors()) {
            this.setErrors(productId.getErrors())
        }

        if (price instanceof PriceValueObject && price.hasErrors()) {
            this.setErrors(price.getErrors())
        }

        if (this.hasErrors())
            throw new ValueObjectException(
                'There are errors in validateValueObject',
                this.getErrors()
            )
    }

    private createEntityPrductUpdatedDomain(valueObject: IProductDomainEntity): ProductDomainEntity {
        const {
            productId,
            price
        } = valueObject
        return new ProductDomainEntity({
            productId: productId.valueOf(),
            price: price.valueOf()
        })
    }

    private executeProductUpdatedAggregateRoot(
        entity: ProductDomainEntity,
    ): Promise<ProductDomainEntity | null> {
        return this.counterAggregateRoot.updateProductPrice(entity)
    }
}