/* The CreateCounterUseCase class is a use case that creates a counter */
import { IUseCase, ValueObjectErrorHandler } from "src/libs";
import { CounterAggregate, CounterCreatedCounterEventPublisherBase, IClientDomainEntity, ICounterCounterCreatedResponse, ICounterCreateCounterCommand, IdValueObject } from "../../../domain";
import { ICounterDomainService } from '../../../domain/services/counter.domain-service';
import { CounterDomainEntity } from '../../../domain/entities/counter/counter.domain-entity';
import { ICounterDomainEntity } from '../../../domain/entities/interfaces/counter.domain-entity.interface';
import { CreateProductUseCase } from "./create-product.use-case";
import { GetProductUseCase } from "./get-product.use-case";
import { GetPosterUseCase } from "./get-poster.use-case";


export class CreateCounterUseCase<
    Command extends ICounterCreateCounterCommand = ICounterCreateCounterCommand,
    Response extends ICounterCounterCreatedResponse = ICounterCounterCreatedResponse
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly counterAggregateRoot: CounterAggregate
    private readonly getProduct: GetProductUseCase
    private readonly getPoster: GetPosterUseCase

    constructor(
        private readonly counterService: ICounterDomainService,
        private readonly counterCreatedCounterEventPublisherBase: CounterCreatedCounterEventPublisherBase,
    ) {
        super();
        this.counterAggregateRoot = new CounterAggregate({
            counterService,
            counterCreatedCounterEventPublisherBase
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
        const entity = this.createEntityCounterDomain(command)
        return this.exectueOrderAggregateRoot(entity as CounterDomainEntity)
    }

    private async createEntityCounterDomain(command: Command): Promise<CounterDomainEntity> {

        const _product = await this.getProduct.execute({ productId: command.productId })
        const _poster = await this.getPoster.execute({ posterId: command.posterId })

        return new CounterDomainEntity({ product: (_product).data.product, poster: (_poster).data.poster })
    }

    private exectueOrderAggregateRoot(entity: ICounterDomainEntity,): Promise<CounterDomainEntity | null> {
        return this.counterAggregateRoot.createCounter(entity as ICounterCreateCounterCommand)
    }
}