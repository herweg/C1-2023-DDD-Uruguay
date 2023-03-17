import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { CounterAggregate, IdValueObject, IProductDomainEntity, IProductDomainService, IProductUpdatedStockResponse, IProductUpdateStockCommand, ProductDomainEntity, ProductUpdatedStockEventPublisherBase, StockValueObject } from "../../../../domain";

export class UpdateStockProductUseCase<
    Command extends IProductUpdateStockCommand = IProductUpdateStockCommand,
    Response extends IProductUpdatedStockResponse = IProductUpdatedStockResponse>

    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly productService: IProductDomainService,
        private readonly productUpdatedStockEventPublisherBase: ProductUpdatedStockEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            productService,
            productUpdatedStockEventPublisherBase
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
        const stock = new StockValueObject(command.stock)

        return {
            productId,
            stock,
        }
    }

    private validateValueObject(valueObject: IProductDomainEntity): void {
        const { productId, stock } = valueObject

        if (productId instanceof IdValueObject && productId.hasErrors()) {
            this.setErrors(productId.getErrors())
        }

        if (stock instanceof StockValueObject && stock.hasErrors()) {
            this.setErrors(stock.getErrors())
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
            stock
        } = valueObject
        return new ProductDomainEntity({
            productId: productId.valueOf(),
            stock: stock.valueOf()
        })
    }

    private executeProductUpdatedAggregateRoot(
        entity: ProductDomainEntity,
    ): Promise<ProductDomainEntity | null> {
        return this.counterAggregateRoot.updateStock(entity as unknown as Command)
    }
}