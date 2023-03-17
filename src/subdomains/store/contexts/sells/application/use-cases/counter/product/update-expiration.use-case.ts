import { DateValueObject, IdValueObject, IProductDomainEntity, IProductDomainService, PriceValueObject } from '../../../../domain';
import { ValueObjectErrorHandler, ValueObjectException } from 'src/libs';
import { IUseCase } from '../../../../../../../../libs/sofka/interface/use-case.interface';
import { CounterAggregate } from '../../../../domain/aggregates/counter.aggregate';
import { ProductDomainEntity } from '../../../../domain/entities/product/product.domain-entity';
import { IProductUpdateExpirationCommand } from '../../../../domain/interfaces/commands/counter/product/update-expiration.command';
import { IProductUpdatedExpirationResponse } from '../../../../domain/interfaces/responses/counter/product/updated-expiration.response';
import { ProductUpdatedExpirationEventPublisherBase } from '../../../../domain/events/publishers/counter/product/updated-expiration.event-publisher';

export class UpdateExpirationProductUseCase<
    Command extends IProductUpdateExpirationCommand = IProductUpdateExpirationCommand,
    Response extends IProductUpdatedExpirationResponse = IProductUpdatedExpirationResponse>

    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly productService: IProductDomainService,
        private readonly productUpdatedExpirationEventPublisherBase: ProductUpdatedExpirationEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            productService,
            productUpdatedExpirationEventPublisherBase
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
        const expirationDate = new DateValueObject(new Date(command.expirationDate.valueOf()))

        return {
            productId,
            expirationDate,
        }
    }

    private validateValueObject(valueObject: IProductDomainEntity): void {
        const { productId, expirationDate } = valueObject

        if (productId instanceof IdValueObject && productId.hasErrors()) {
            this.setErrors(productId.getErrors())
        }

        if (expirationDate instanceof DateValueObject && expirationDate.hasErrors()) {
            this.setErrors(expirationDate.getErrors())
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
            expirationDate
        } = valueObject
        return new ProductDomainEntity({
            productId: productId.valueOf(),
            expirationDate: new Date(expirationDate.valueOf())
        })
    }

    private executeProductUpdatedAggregateRoot(
        entity: ProductDomainEntity,
    ): Promise<ProductDomainEntity | null> {
        return this.counterAggregateRoot.updateProductExpiration(entity)
    }
}