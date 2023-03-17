import { EventPublisherBase } from "src/libs";
import { TicketDomainEntity } from "../../../entities/ticket/ticket.domain-entity.ts";

export abstract class TicketMadeRefoundEventPublisherBase<
    Response = TicketDomainEntity
> extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'store.ticket.made-refound',
            JSON.stringify({ data: this.response })
        )
    }
}