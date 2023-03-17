import { TicketDomainEntity } from "../entities/ticket/ticket.domain-entity.ts"

export interface ITicketDomainService<T extends TicketDomainEntity = TicketDomainEntity> {
    createTicket(ticket: T): Promise<T>
    makeRefound(ticket: string): Promise<T>
}