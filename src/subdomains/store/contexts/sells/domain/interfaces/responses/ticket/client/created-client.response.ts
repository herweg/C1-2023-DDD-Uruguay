import { TicketDomainEntity } from "../../../../entities/ticket/ticket.domain-entity.ts";

export interface IClientCreatedClientResponse {
    success: boolean;
    data: TicketDomainEntity | null;
}