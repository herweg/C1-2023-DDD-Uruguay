/* The CreateCounterUseCase class is a use case that creates a counter */
import { IUseCase, ValueObjectErrorHandler } from "src/libs";
import { CounterAggregate, CounterCreatedCounterEventPublisherBase, GettedPosterEventPublisherBase, GettedProductEventPublisherBase, IClientDomainEntity, ICounterCounterCreatedResponse, ICounterCreateCounterCommand, IdValueObject, IPosterDomainService, IProductDomainService } from "../../../domain";
import { ICounterDomainService } from '../../../domain/services/counter.domain-service';
import { CounterDomainEntity } from '../../../domain/entities/counter/counter.domain-entity';
import { ICounterDomainEntity } from '../../../domain/entities/interfaces/counter.domain-entity.interface';

export class CreateCounterUseCase<
    Command extends ICounterCreateCounterCommand = ICounterCreateCounterCommand,
    Response extends ICounterCounterCreatedResponse = ICounterCounterCreatedResponse
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly counterAggregateRoot: CounterAggregate

    constructor(
        private readonly counterService: ICounterDomainService,
        private readonly posterService: IPosterDomainService,
        private readonly productService: IProductDomainService,
        private readonly counterCreatedCounterEventPublisherBase: CounterCreatedCounterEventPublisherBase,
        private readonly gettedProductEventPublisherBase: GettedProductEventPublisherBase,
        private readonly gettedPosterEventPublisherBase: GettedPosterEventPublisherBase
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            counterService,
            posterService,
            productService,
            counterCreatedCounterEventPublisherBase,
            gettedProductEventPublisherBase,
            gettedPosterEventPublisherBase
        })
    }

    /**
     * If the command is executed successfully, return the data, otherwise return false.
     * @param {Command} [command] - Command - The command to execute.
     * @returns The return type is Response, but the return value is an object with a success property and
     * a data property.
     */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);
        return { success: data ? true : false, data } as unknown as Response
    }

    private async executeCommand(command: Command): Promise<CounterDomainEntity | null> {
        const entity = await this.createEntityCounterDomain(command)
        return await this.exectueOrderAggregateRoot(entity as CounterDomainEntity)
    }

    private async createEntityCounterDomain(command: Command): Promise<CounterDomainEntity> {

        const _product = await this.counterAggregateRoot.getProduct(command.productId)
        const _poster = await this.counterAggregateRoot.getPoster(command.posterId)

        return new CounterDomainEntity({ product: _product, poster: _poster })
    }

    private exectueOrderAggregateRoot(entity: CounterDomainEntity): Promise<CounterDomainEntity | null> {
        return this.counterAggregateRoot.createCounter(entity)
    }
}