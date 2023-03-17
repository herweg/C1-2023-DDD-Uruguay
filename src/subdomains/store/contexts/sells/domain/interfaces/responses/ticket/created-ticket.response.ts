import { TicketDomainEntity } from "../../../entities/ticket/ticket.domain-entity.ts";

export interface ITicketCreatedTicketResponse {
    success: boolean;
    data: TicketDomainEntity | null;
}