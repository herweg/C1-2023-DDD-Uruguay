import { EventPublisherBase } from "src/libs";
import { TicketDomainEntity } from "../../../entities/ticket/ticket.domain-entity.ts";

export abstract class TicketCreatedTicketEventPublisherBase<
    Response = TicketDomainEntity
> extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'store.ticket.created-ticket',
            JSON.stringify({ data: this.response })
        )
    }
}