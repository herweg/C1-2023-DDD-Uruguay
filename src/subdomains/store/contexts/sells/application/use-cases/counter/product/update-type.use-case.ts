import { DessertType, IdValueObject, IProductDomainEntity, IProductDomainService, ProductTypeValueObject } from '../../../../domain';
import { ValueObjectErrorHandler, ValueObjectException } from 'src/libs';
import { IUseCase } from '../../../../../../../../libs/sofka/interface/use-case.interface';
import { CounterAggregate } from '../../../../domain/aggregates/counter.aggregate';
import { ProductDomainEntity } from '../../../../domain/entities/product/product.domain-entity';
import { IProductUpdateTypeCommand } from '../../../../domain/interfaces/commands/counter/product/update-type.command';
import { IProductUpdatedTypeResponse } from '../../../../domain/interfaces/responses/counter/product/updated-type.response';
import { ProductUpdatedTypeEventPublisherBase } from '../../../../domain/events/publishers/counter/product/updated-type.event-publisher';

export class UpdateTypeProductUseCase<
    Command extends IProductUpdateTypeCommand = IProductUpdateTypeCommand,
    Response extends IProductUpdatedTypeResponse = IProductUpdatedTypeResponse>

    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly productService: IProductDomainService,
        private readonly productUpdatedTypeEventPublisherBase: ProductUpdatedTypeEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            productService,
            productUpdatedTypeEventPublisherBase
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
        const type = new ProductTypeValueObject(command.type)

        return {
            productId,
            type,
        }
    }

    private validateValueObject(valueObject: IProductDomainEntity): void {
        const { productId, type } = valueObject

        if (productId instanceof IdValueObject && productId.hasErrors()) {
            this.setErrors(productId.getErrors())
        }

        if (type instanceof ProductTypeValueObject && type.hasErrors()) {
            this.setErrors(type.getErrors())
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
            type
        } = valueObject
        if (type instanceof ProductTypeValueObject)
        return new ProductDomainEntity({
            productId: productId.valueOf(),
            type: type.value
        })
    }

    private executeProductUpdatedAggregateRoot(
        entity: ProductDomainEntity,
    ): Promise<ProductDomainEntity | null> {
        return this.counterAggregateRoot.updateProductType(entity)
    }
}