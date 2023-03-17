import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { ClientDomainEntity, IClientDomainEntity, IClientDomainService, IdValueObject, NameValueObject, TicketAggregate } from "../../../..";
import { ClientCreatedClientEventPublisherBase } from "../../../../domain/events/publishers/ticket/client/created-client.event-publisher";
import { IClientCreateClientCommand } from "../../../../domain/interfaces/commands/ticket/client/create-client.command";
import { IClientCreatedClientResponse } from "../../../../domain/interfaces/responses/ticket/client/created-client.response";
import { PhoneValueObject } from "../../../../domain/value-objects/common/phone/phone.value-object";

export class CreateClientUseCase<
    Command extends IClientCreateClientCommand = IClientCreateClientCommand,
    Response extends IClientCreatedClientResponse = IClientCreatedClientResponse
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly clientAggregateRoot: TicketAggregate

    constructor(
        private readonly clientService: IClientDomainService,
        private readonly clientCreatedClientEventPublisherBase: ClientCreatedClientEventPublisherBase
    ) {
        super();
        this.clientAggregateRoot = new TicketAggregate({
            clientService,
            clientCreatedClientEventPublisherBase
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    executeCommand(command: Command): Promise<ClientDomainEntity | null> {
        const valueObject = this.createValueObject(command)
        this.validateValueObject(valueObject)
        const response = this.createEntityProductDomain(valueObject)
        return this.executeProductAggregateRoot(response)
    }

    createValueObject(command: Command): IClientDomainEntity {
        const clientId = new IdValueObject(command.clientId)
        const name = new NameValueObject(command.name)
        const phone = new PhoneValueObject(command.phone)

        return {
            clientId,
            name,
            phone
        }
    }

    validateValueObject(valueObject: IClientDomainEntity): void {
        const {
            clientId,
            name,
            phone
        } = valueObject

        if (clientId instanceof IdValueObject && clientId.hasErrors())
            this.setErrors(clientId.getErrors())
        if (name instanceof NameValueObject && name.hasErrors())
            this.setErrors(name.getErrors())
        if (phone instanceof PhoneValueObject && phone.hasErrors())
            this.setErrors(phone.getErrors())

        if (this.hasErrors())
            throw new ValueObjectException(
                'Salary: Hay errres en validateValueObject',
                this.getErrors()
            )
    }

    createEntityProductDomain(
        valueObject: IClientDomainEntity
    ): IClientDomainEntity {
        const {
            clientId,
            name,
            phone
        } = valueObject

        return new ClientDomainEntity({
            clientId: clientId.valueOf(),
            name: name.valueOf(),
            phone: phone.valueOf(),
        })
    }

    private executeProductAggregateRoot(
        entity: ClientDomainEntity,
    ): Promise<ClientDomainEntity | null> {
        return this.clientAggregateRoot.createSeller(entity)
    }
}