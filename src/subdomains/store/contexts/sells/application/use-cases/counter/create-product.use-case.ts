import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { CounterAggregate, CounterCreatedProductEventPublisherBase, DateValueObject, FlavourValueObject, ICounterCreateProductCommand, ICounterDomainService, ICounterProductCreatedResponse, IdValueObject, IProductDomainEntity, IProductDomainService, PriceValueObject, ProductDomainEntity, ProductTypeValueObject, StockValueObject } from "../../../domain";

export class CreateProductUseCase<
    Command extends ICounterCreateProductCommand = ICounterCreateProductCommand,
    Response extends ICounterProductCreatedResponse = ICounterProductCreatedResponse
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly productService: IProductDomainService,
        private readonly counterCreatedProductEventPublisherBase: CounterCreatedProductEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            productService,
            counterCreatedProductEventPublisherBase
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    executeCommand(command: Command): Promise<ProductDomainEntity | null> {
        const valueObject = this.createValueObject(command)
        this.validateValueObject(valueObject)
        const product = this.createEntityProductDomain(valueObject)
        return this.executeProductAggregateRoot(product)
    }

    createValueObject(command: Command): IProductDomainEntity {
        const productId = new IdValueObject(command.productId)
        const type = new ProductTypeValueObject(command.type)
        const flavour = new FlavourValueObject(command.flavour)
        const price = new PriceValueObject(command.price)
        const stock = new StockValueObject(command.stock)
        const expirationDate = command?.expirationDate//new DateValueObject(command.expirationDate)

        return {
            productId,
            type,
            flavour,
            price,
            stock,
            expirationDate
        }
    }

    validateValueObject(valueObject: IProductDomainEntity): void {
        const {
            productId,
            type,
            flavour,
            price,
            stock,
            expirationDate
        } = valueObject

        if (productId instanceof IdValueObject && productId.hasErrors())
            this.setErrors(productId.getErrors())
        if (type instanceof ProductTypeValueObject && type.hasErrors())
            this.setErrors(type.getErrors())
        if (flavour instanceof FlavourValueObject && flavour.hasErrors())
            this.setErrors(flavour.getErrors())
        if (price instanceof PriceValueObject && price.hasErrors())
            this.setErrors(price.getErrors())
        if (stock instanceof StockValueObject && stock.hasErrors())
            this.setErrors(stock.getErrors())
        if (expirationDate instanceof DateValueObject && expirationDate.hasErrors())
            this.setErrors(expirationDate.getErrors())

        if (this.hasErrors())
            throw new ValueObjectException(
                'Hay errres en validateValueObject',
                this.getErrors()
            )
    }

    createEntityProductDomain(
        valueObject: IProductDomainEntity
    ): ProductDomainEntity {
        const {
            type,
            flavour,
            price,
            stock,
            expirationDate
        } = valueObject

        if (type instanceof ProductTypeValueObject && flavour instanceof FlavourValueObject)
        return new ProductDomainEntity({
            type: type.value,
            flavour: flavour.value,
            price: price.valueOf(),
            stock: stock.valueOf(),
            expirationDate: expirationDate
        })
    }

    private executeProductAggregateRoot(
        entity: ProductDomainEntity,
    ): Promise<ProductDomainEntity | null> {
        return this.counterAggregateRoot.createProduct(entity)
    }
}