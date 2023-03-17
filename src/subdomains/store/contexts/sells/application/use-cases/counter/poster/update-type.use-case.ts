import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { CounterAggregate, IPosterDomainService, PosterDomainEntity, IPosterDomainEntity, IdValueObject, PosterTypeValueObject } from "../../../../domain";
import { PosterUpdatedTypeEventPublisherBase } from "../../../../domain/events/publishers/counter/poster/updated-type.event-publisher";
import { IPosterUpdateTypeCommand } from "../../../../domain/interfaces/commands/counter/poster/update-type.command";
import { IPosterUpdatedTypeResponse } from "../../../../domain/interfaces/responses/counter/poster/updated-type.response";

export class UpdateTypePosterUseCase<
    Command extends IPosterUpdateTypeCommand = IPosterUpdateTypeCommand,
    Response extends IPosterUpdatedTypeResponse = IPosterUpdatedTypeResponse>

    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly posterService: IPosterDomainService,
        private readonly posterUpdatedTypeEventPublisherBase: PosterUpdatedTypeEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            posterService,
            posterUpdatedTypeEventPublisherBase
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
        const type = new PosterTypeValueObject(command.type)

        return {
            posterId,
            type,
        }
    }

    private validateValueObject(valueObject: IPosterDomainEntity): void {
        const { posterId, type } = valueObject

        if (posterId instanceof IdValueObject && posterId.hasErrors()) {
            this.setErrors(posterId.getErrors())
        }

        if (type instanceof PosterTypeValueObject && type.hasErrors()) {
            this.setErrors(type.getErrors())
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
            type
        } = valueObject
        if (type instanceof PosterTypeValueObject)
        return new PosterDomainEntity({
            posterId: posterId.valueOf(),
            type: type.value
        })
    }

    private executePosterUpdatedAggregateRoot(
        entity: PosterDomainEntity,
    ): Promise<PosterDomainEntity | null> {
        return this.counterAggregateRoot.updatePosterType(entity)
    }
}