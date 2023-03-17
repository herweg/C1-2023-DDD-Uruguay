import { TicketDomainEntity } from "../../../entities/ticket/ticket.domain-entity.ts";

export interface ITicketMadeRefoundResponse {
    success: boolean;
    data: TicketDomainEntity | null;
}