import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { IPosterUpdateImageCommand, IPosterUpdatedImageResponse, CounterAggregate, IPosterDomainService, PosterUpdatedPriceEventPublisherBase, PosterDomainEntity, IPosterDomainEntity, IdValueObject, PriceValueObject, PosterUpdatedImageEventPublisherBase, ImageValueObject } from "../../../../domain";

export class UpdateImageUseCase<
    Command extends IPosterUpdateImageCommand = IPosterUpdateImageCommand,
    Response extends IPosterUpdatedImageResponse = IPosterUpdatedImageResponse>

    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly posterService: IPosterDomainService,
        private readonly posterUpdatedImageEventPublisherBase: PosterUpdatedImageEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            posterService,
            posterUpdatedImageEventPublisherBase
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
        const image = new ImageValueObject(command.image)

        return {
            posterId,
            image,
        }
    }

    private validateValueObject(valueObject: IPosterDomainEntity): void {
        const { posterId, image } = valueObject

        if (posterId instanceof IdValueObject && posterId.hasErrors()) {
            this.setErrors(posterId.getErrors())
        }

        if (image instanceof ImageValueObject && image.hasErrors()) {
            this.setErrors(image.getErrors())
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
            image
        } = valueObject
        return new PosterDomainEntity({
            posterId: posterId.valueOf(),
            image: image.valueOf()
        })
    }

    private executePosterUpdatedAggregateRoot(
        entity: PosterDomainEntity,
    ): Promise<PosterDomainEntity | null> {
        return this.counterAggregateRoot.updateImage(entity)
    }
}