import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import {
    CounterAggregate,
    CounterCreatedPosterEventPublisherBase,
    FlavourValueObject,
    ICounterCreatePosterCommand,
    ICounterPosterCreatedResponse,
    IdValueObject,
    ImageValueObject,
    IPosterDomainEntity,
    IPosterDomainService,
    PosterDomainEntity,
    PosterTypeValueObject,
    PriceValueObject,
    StockValueObject
} from "../../../domain";

export class CreatePosterUseCase<
    Command extends ICounterCreatePosterCommand = ICounterCreatePosterCommand,
    Response extends ICounterPosterCreatedResponse = ICounterPosterCreatedResponse
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly posterService: IPosterDomainService,
        private readonly counterCreatedPosterEventPublisherBase: CounterCreatedPosterEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            posterService,
            counterCreatedPosterEventPublisherBase
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    executeCommand(command: Command): Promise<PosterDomainEntity | null> {
        const valueObject = this.createValueObject(command)
        this.validateValueObject(valueObject)
        const poster = this.createEntityPosterDomain(valueObject)
        return this.executePosterAggregateRoot(poster)
    }

    createValueObject(command: Command): PosterDomainEntity {
        const posterId = new IdValueObject(command?.posterId)
        const type =  new PosterTypeValueObject(command.type)
        const flavour = new FlavourValueObject(command.flavour)
        const price = new PriceValueObject(command.price)
        const stock =  new StockValueObject(command.stock)
        const image = new ImageValueObject(command.image)

        return {
            posterId,
            type,
            flavour,
            price,
            stock,
            image
        }
    }

    validateValueObject(valueObject: IPosterDomainEntity): void {
        const {
            posterId,
            type,
            flavour,
            price,
            stock,
            image
        } = valueObject

        if (posterId instanceof IdValueObject && posterId.hasErrors())
            this.setErrors(posterId.getErrors())
        if (type instanceof PosterTypeValueObject && type.hasErrors())
            this.setErrors(type.getErrors())
        if (flavour instanceof FlavourValueObject && flavour.hasErrors())
            this.setErrors(flavour.getErrors())
        if (price instanceof PriceValueObject && price.hasErrors())
            this.setErrors(price.getErrors())
        if (stock instanceof StockValueObject && stock.hasErrors())
            this.setErrors(stock.getErrors())
        if (image instanceof ImageValueObject && image.hasErrors())
            this.setErrors(image.getErrors())

        console.log("valueob:" + JSON.stringify(valueObject));

        if (this.hasErrors())
            throw new ValueObjectException(
                'Hay errres en validateValueObject',
                this.getErrors()
            )
    }

    createEntityPosterDomain(
        valueObject: IPosterDomainEntity
    ): PosterDomainEntity {
        const {
            posterId,
            type,
            flavour,
            price,
            stock,
            image
        } = valueObject
        
        if (type instanceof PosterTypeValueObject && flavour instanceof FlavourValueObject)
        return new PosterDomainEntity({
            posterId: posterId.valueOf(),
            type: type.value,
            flavour: flavour.value,
            price: price.valueOf(),
            stock: stock.valueOf(),
            image: image.valueOf()
        })
    }

    private executePosterAggregateRoot(
        entity: PosterDomainEntity,
    ): Promise<PosterDomainEntity | null> {
        return this.counterAggregateRoot.createPoster(entity)
    }
}