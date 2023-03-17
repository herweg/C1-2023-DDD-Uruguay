import { TicketDomainEntity } from "../../../../entities/ticket/ticket.domain-entity.ts";

export interface ISellerAddedSellerResponse {
    success: boolean;
    data: TicketDomainEntity | null;
}