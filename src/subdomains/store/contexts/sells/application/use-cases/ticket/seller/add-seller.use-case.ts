import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { IdValueObject, ISellerDomainEntity, NameValueObject, SalaryValueObject, SellerDomainEntity, TicketAggregate } from "../../../..";
import { SellerAddedSellerEventPublisherBase } from "../../../../domain/events/publishers/ticket/seller/added-seller.event-publisher";
import { ISellerCreateSellerCommand } from "../../../../domain/interfaces/commands/ticket/seller/add-seller.command";
import { ISellerAddedSellerResponse } from "../../../../domain/interfaces/responses/ticket/seller/added-seller.response";
import { ISellerDomainService } from "../../../../domain/services/seller.domain-service";

export class CreateSellerUseCase<
    Command extends ISellerCreateSellerCommand = ISellerCreateSellerCommand,
    Response extends ISellerAddedSellerResponse = ISellerAddedSellerResponse
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly sellerAggregateRoot: TicketAggregate

    constructor(
        private readonly sellerService: ISellerDomainService,
        private readonly sellerAddedSellerEventPublisherBase: SellerAddedSellerEventPublisherBase
    ) {
        super();
        this.sellerAggregateRoot = new TicketAggregate({
            sellerService,
            sellerAddedSellerEventPublisherBase
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    executeCommand(command: Command): Promise<SellerDomainEntity | null> {
        const valueObject = this.createValueObject(command)
        this.validateValueObject(valueObject)
        const seller = this.createEntityProductDomain(valueObject)
        return this.executeProductAggregateRoot(seller)
    }

    createValueObject(command: Command): ISellerDomainEntity {
        const sellerId = new IdValueObject(command.sellerId)
        const name = new NameValueObject(command.name)
        const salary = new SalaryValueObject(command.salary)

        return {
            sellerId,
            name,
            salary
        }
    }

    validateValueObject(valueObject: ISellerDomainEntity): void {
        const {
            sellerId,
            name,
            salary
        } = valueObject

        if (sellerId instanceof IdValueObject && sellerId.hasErrors())
            this.setErrors(sellerId.getErrors())
        if (name instanceof NameValueObject && name.hasErrors())
            this.setErrors(name.getErrors())
        if (salary instanceof SalaryValueObject && salary.hasErrors())
            this.setErrors(salary.getErrors())

        if (this.hasErrors())
            throw new ValueObjectException(
                'Salary: Hay errres en validateValueObject',
                this.getErrors()
            )
    }

    createEntityProductDomain(
        valueObject: ISellerDomainEntity
    ): ISellerDomainEntity {
        const {
            sellerId,
            name,
            salary
        } = valueObject

        return new SellerDomainEntity({
            sellerId: sellerId.valueOf(),
            name: name.valueOf(),
            salary: salary.valueOf(),
        })
    }

    private executeProductAggregateRoot(
        entity: SellerDomainEntity,
    ): Promise<SellerDomainEntity | null> {
        return this.sellerAggregateRoot.createSeller(entity)
    }
}