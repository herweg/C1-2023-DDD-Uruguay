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
            clientCreatedClientEventPublisherBase
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
            this.clientCreatedClientEventPublisherBase = clientCreatedClientEventPublisherBase
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

        this.sellerAddedSellerEventPublisherBase.response = seller
        this.sellerAddedSellerEventPublisherBase.publish()
        return seller
    }
    async updateSalary(seller: SellerDomainEntity): Promise<SellerDomainEntity> {
        if (!this.sellerService) throw new AggregateRootException("updateSalary service not found")
        if (!this.sellerSalaryUpdatedEventPublisherBase) throw new AggregateRootException("updateSalary event not found")

        this.sellerSalaryUpdatedEventPublisherBase.response = seller
        this.sellerSalaryUpdatedEventPublisherBase.publish()
        return seller
    }

    //Client
    async createClient(client: ClientDomainEntity): Promise<ClientDomainEntity> {
        if (!this.clientService) throw new AggregateRootException("createClient not found.")
        if (!this.clientCreatedClientEventPublisherBase) throw new AggregateRootException("createClient Event not found.")

        this.clientCreatedClientEventPublisherBase.response = client
        this.clientCreatedClientEventPublisherBase.publish()
        return client
    }
}
