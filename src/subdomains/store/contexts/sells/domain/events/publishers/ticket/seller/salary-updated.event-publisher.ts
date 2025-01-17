import { EventPublisherBase } from "src/libs";
import { SellerDomainEntity } from "../../../../entities";

export abstract class SellerSalaryUpdatedEventPublisherBase<
    Response = SellerDomainEntity
> extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'store.seller.seller-salary',
            JSON.stringify({ data: this.response })
        )
    }
}