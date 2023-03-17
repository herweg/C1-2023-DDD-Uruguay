import { EventPublisherBase } from "src/libs";
import { SellerDomainEntity } from "../../../../entities";

export abstract class SellerAddedSellerEventPublisherBase<
    Response = SellerDomainEntity
> extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'store.seller.added-seller',
            JSON.stringify({ data: this.response })
        )
    }
}