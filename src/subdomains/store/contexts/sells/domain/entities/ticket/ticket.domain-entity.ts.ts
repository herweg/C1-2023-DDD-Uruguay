import { IdValueObject, TotalPriceValueObject, TicketTypeValueObject, QuantityValueObject, DateValueObject } from "../../value-objects";
import { ITicketDomainEntity } from "../interfaces/ticket.domain-entity.interface";
import { v4 as uuid } from 'uuid';
import { ClientDomainEntity } from "../client";
import { SellerDomainEntity } from "../seller";

export class TicketDomainEntity implements ITicketDomainEntity {
    ticketId: string | IdValueObject;
    productId: string | IdValueObject;
    seller: SellerDomainEntity;
    client: ClientDomainEntity;
    totalPrice: number | TotalPriceValueObject;
    type: string | TicketTypeValueObject;
    quantity: number | QuantityValueObject;
    date: Date | DateValueObject;

    constructor(data?: ITicketDomainEntity) {
        if (data?.ticketId) this.ticketId = data.ticketId
        else this.ticketId = new IdValueObject(uuid())
        if (data?.productId) this.productId = data.productId

        if (data?.client) this.client = data.client
        if (data?.seller) this.seller = data.seller
        if (data?.date) this.date = data.date
        if (data?.quantity) this.quantity = data.quantity
        if (data?.type) this.type = data.type
        if (data?.totalPrice) this.totalPrice = data.totalPrice
    }
}
