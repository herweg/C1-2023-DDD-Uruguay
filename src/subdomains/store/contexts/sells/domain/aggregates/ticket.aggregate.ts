import { ClientDomainEntity, SellerDomainEntity } from "../entities";
import { TicketDomainEntity } from "../entities/ticket/ticket.domain-entity.ts";
import { TicketCreatedTicketEventPublisherBase } from "../events/publishers/ticket/created-ticket.event-publisher";
import { TicketMadeRefoundEventPublisherBase } from "../events/publishers/ticket/made-refound.event-publisher";
import { SellerSalaryUpdatedEventPublisherBase } from "../events/publishers/ticket/seller/salary-updated.event-publisher";
import { IClientDomainService } from "../services/client.domain-service";
import { ISellerDomainService } from "../services/seller.domain-service";
import { ITicketDomainService } from "../services/ticket.domain-service";
import { ClientCreatedClientEventPublisherBase } from "../events/publishers/ticket/client/created-client.event-publisher";
import { SellerAddedSellerEventPublisherBase } from "../events/publishers/ticket/seller/added-seller.event-publisher";
import { AggregateRootException } from "src/libs/sofka/exceptions/aggregate-root.exception";
import { GettedClientEventPublisherBase } from "../events/publishers/ticket/client/getted-client.event-publisher";

export class TicketAggregate implements
    ITicketDomainService,
    ISellerDomainService,
    IClientDomainService {

    //Services
    private readonly ticketService?: ITicketDomainService
    private readonly sellerService?: ISellerDomainService
    private readonly clientService?: IClientDomainService

    //Ticket
    private readonly ticketCreatedTicketEventPublisherBase?: TicketCreatedTicketEventPublisherBase
    private readonly ticketMadeRefoundEventPublisherBase?: TicketMadeRefoundEventPublisherBase
    //Seller
    private readonly sellerAddedSellerEventPublisherBase?: SellerAddedSellerEventPublisherBase
    private readonly sellerSalaryUpdatedEventPublisherBase?: SellerSalaryUpdatedEventPublisherBase
    //Client
    private readonly clientCreatedClientEventPublisherBase?: ClientCreatedClientEventPublisherBase
    private readonly gettedClientEventPublisherBase?: GettedClientEventPublisherBase

    constructor(
        {
            //Services
            ticketService,
            sellerService,
            clientService,
            //Ticket
            ticketCreatedTicketEventPublisherBase,
            ticketMadeRefoundEventPublisherBase,
            //Seller
            sellerAddedSellerEventPublisherBase,
            sellerSalaryUpdatedEventPublisherBase,
            //Client
            clientCreatedClientEventPublisherBase,
            gettedClientEventPublisherBase
        }: {
            //Services
            ticketService?: ITicketDomainService
            sellerService?: ISellerDomainService
            clientService?: IClientDomainService
            //Ticket
            ticketCreatedTicketEventPublisherBase?: TicketCreatedTicketEventPublisherBase
            ticketMadeRefoundEventPublisherBase?: TicketMadeRefoundEventPublisherBase
            //Seller
            sellerAddedSellerEventPublisherBase?: SellerAddedSellerEventPublisherBase
            sellerSalaryUpdatedEventPublisherBase?: SellerSalaryUpdatedEventPublisherBase
            //Client
            clientCreatedClientEventPublisherBase?: ClientCreatedClientEventPublisherBase
            gettedClientEventPublisherBase?: GettedClientEventPublisherBase
        }
    ) {
        //Services
        this.ticketService = ticketService,
            this.sellerService = sellerService,
            this.clientService = clientService,
            //Ticket
            this.ticketCreatedTicketEventPublisherBase = ticketCreatedTicketEventPublisherBase,
            this.ticketMadeRefoundEventPublisherBase = ticketMadeRefoundEventPublisherBase,
            //Seller
            this.sellerAddedSellerEventPublisherBase = sellerAddedSellerEventPublisherBase,
            this.sellerSalaryUpdatedEventPublisherBase = sellerSalaryUpdatedEventPublisherBase,
            //Client
            this.clientCreatedClientEventPublisherBase = clientCreatedClientEventPublisherBase,
            this.gettedClientEventPublisherBase = gettedClientEventPublisherBase
    }

    //Ticket
    async createTicket(ticket: TicketDomainEntity): Promise<TicketDomainEntity> {
        throw new Error("Method not implemented.");
    }
    async makeRefound(ticket: string): Promise<TicketDomainEntity> {
        throw new Error("Method not implemented.");
    }

    //seller
    async createSeller(seller: SellerDomainEntity): Promise<SellerDomainEntity> {
        if (!this.sellerService) throw new AggregateRootException("sellerService not found.")
        if (!this.sellerAddedSellerEventPublisherBase) throw new AggregateRootException("sellerService Event not found.")

        const salaryUpdated = await this.sellerService.createSeller(seller)

        this.sellerAddedSellerEventPublisherBase.response = salaryUpdated
        this.sellerAddedSellerEventPublisherBase.publish()
        return salaryUpdated
    }
    
    async updateSalary(seller: SellerDomainEntity): Promise<SellerDomainEntity> {
        if (!this.sellerService) throw new AggregateRootException("updateSalary service not found")
        if (!this.sellerSalaryUpdatedEventPublisherBase) throw new AggregateRootException("updateSalary event not found")

        const salaryUpdated = await this.sellerService.updateSalary(seller)

        this.sellerSalaryUpdatedEventPublisherBase.response = salaryUpdated
        this.sellerSalaryUpdatedEventPublisherBase.publish()
        return salaryUpdated
    }

    //Client
    async createClient(client: ClientDomainEntity): Promise<ClientDomainEntity> {
        if (!this.clientService) throw new AggregateRootException("createClient not found.")
        if (!this.clientCreatedClientEventPublisherBase) throw new AggregateRootException("createClient Event not found.")

        const clientResult = await this.clientService.createClient(client)

        this.clientCreatedClientEventPublisherBase.response = clientResult
        this.clientCreatedClientEventPublisherBase.publish()
        return clientResult
    }

    async getClient(client: string): Promise<ClientDomainEntity> {
        if (!this.clientService) throw new AggregateRootException("getPoster CounterService not found")
        if (!this.gettedClientEventPublisherBase) throw new AggregateRootException("getPoster event not found")

        const getClient = await this.clientService.getClient(client)

        this.gettedClientEventPublisherBase.response = getClient
        this.gettedClientEventPublisherBase.publish()
        return getClient
    }
}
