import { EventPublisherBase } from "src/libs";
import { ClientDomainEntity } from "../../../../entities";

export abstract class GettedClientEventPublisherBase<
    Response = ClientDomainEntity
> extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'store.client.getted-client',
            JSON.stringify({ data: this.response })
        )
    }
}