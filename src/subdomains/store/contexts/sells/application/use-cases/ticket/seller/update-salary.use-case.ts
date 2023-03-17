import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { IdValueObject, ISellerDomainEntity, NameValueObject, SalaryValueObject, SellerDomainEntity, TicketAggregate } from "../../../../domain";
import { SellerSalaryUpdatedEventPublisherBase } from "../../../../domain/events/publishers/ticket/seller/salary-updated.event-publisher";
import { ISellerUpdateSalaryCommand } from "../../../../domain/interfaces/commands/ticket/seller/update-salary.command";
import { ISellerUpdatedSalaryResponse } from "../../../../domain/interfaces/responses/ticket/seller/updated-salary.command";
import { ISellerDomainService } from "../../../../domain/services/seller.domain-service";

export class UpdateSalarySellerUseCase<
    Command extends ISellerUpdateSalaryCommand = ISellerUpdateSalaryCommand,
    Response extends ISellerUpdatedSalaryResponse = ISellerUpdatedSalaryResponse>

    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>{

    private readonly sellerAggregateRoot: TicketAggregate

    constructor(
        private readonly sellerService: ISellerDomainService,
        private readonly sellerSalaryUpdatedEventPublisherBase: SellerSalaryUpdatedEventPublisherBase
    ) {
        super();
        this.sellerAggregateRoot = new TicketAggregate({
            sellerService,
            sellerSalaryUpdatedEventPublisherBase
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    private executeCommand(command: Command): Promise<SellerDomainEntity> {
        const valueObject = this.createValueObject(command)
        this.validateValueObject(valueObject)
        const product = this.createEntityPrductUpdatedDomain(valueObject)
        return this.executeProductUpdatedAggregateRoot(product)
    }

    private createValueObject(command: Command): ISellerDomainEntity {
        const sellerId = new IdValueObject(command.sellerId)
        const name = new NameValueObject(command.name)
        const salary = new SalaryValueObject(command.salary)

        return {
            sellerId,
            name,
            salary,
        }
    }

    private validateValueObject(valueObject: ISellerDomainEntity): void {
        const {
            sellerId,
            name,
            salary,
        } = valueObject

        if (sellerId instanceof IdValueObject && sellerId.hasErrors()) {
            this.setErrors(sellerId.getErrors())
        }

        if (name instanceof NameValueObject && name.hasErrors()) {
            this.setErrors(name.getErrors())
        }

        if (salary instanceof SalaryValueObject && salary.hasErrors()) {
            this.setErrors(salary.getErrors())
        }

        if (this.hasErrors())
            throw new ValueObjectException(
                'There are errors in validateValueObject',
                this.getErrors()
            )
    }

    private createEntityPrductUpdatedDomain(valueObject: ISellerDomainEntity): SellerDomainEntity {
        const {
            sellerId,
            name,
            salary,
        } = valueObject
        return new SellerDomainEntity({
            sellerId: sellerId.valueOf(),
            name: name.valueOf(),
            salary: salary.valueOf()
        })
    }

    private executeProductUpdatedAggregateRoot(
        entity: SellerDomainEntity,
    ): Promise<SellerDomainEntity | null> {
        return this.sellerAggregateRoot.updateSalary(entity as unknown as Command)
    }
}