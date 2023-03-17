import { EventPublisherBase } from "src/libs";
import { ClientDomainEntity } from "../../../../entities";

export abstract class ClientCreatedClientEventPublisherBase<
    Response = ClientDomainEntity
> extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'store.client.created-client',
            JSON.stringify({ data: this.response })
        )
    }
}