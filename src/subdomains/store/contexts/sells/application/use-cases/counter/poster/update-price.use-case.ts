import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { IPosterUpdatePriceCommand, IPosterUpdatedPriceResponse, CounterAggregate, IPosterDomainService, PosterUpdatedPriceEventPublisherBase, PosterDomainEntity, IPosterDomainEntity, IdValueObject, PriceValueObject } from "../../../../domain";

export class UpdatePricePosterUseCase<
    Command extends IPosterUpdatePriceCommand = IPosterUpdatePriceCommand,
    Response extends IPosterUpdatedPriceResponse = IPosterUpdatedPriceResponse>

    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly posterService: IPosterDomainService,
        private readonly posterUpdatedPriceEventPublisherBase: PosterUpdatedPriceEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            posterService,
            posterUpdatedPriceEventPublisherBase
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    private executeCommand(command: Command): Promise<PosterDomainEntity> {
        const valueObject = this.createValueObject(command)
        this.validateValueObject(valueObject)
        const poster = this.createEntityPrductUpdatedDomain(valueObject)
        return this.executePosterUpdatedAggregateRoot(poster)
    }

    private createValueObject(command: Command): IPosterDomainEntity {
        const posterId = new IdValueObject(command.posterId)
        const price = new PriceValueObject(command.newPrice)

        return {
            posterId,
            price,
        }
    }

    private validateValueObject(valueObject: IPosterDomainEntity): void {
        const { posterId, price } = valueObject

        if (posterId instanceof IdValueObject && posterId.hasErrors()) {
            this.setErrors(posterId.getErrors())
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

    private createEntityPrductUpdatedDomain(valueObject: IPosterDomainEntity): PosterDomainEntity {
        const {
            posterId,
            price
        } = valueObject
        return new PosterDomainEntity({
            posterId: posterId.valueOf(),
            price: price.valueOf()
        })
    }

    private executePosterUpdatedAggregateRoot(
        entity: PosterDomainEntity,
    ): Promise<PosterDomainEntity | null> {
        return this.counterAggregateRoot.updatePosterPrice(entity)
    }
}