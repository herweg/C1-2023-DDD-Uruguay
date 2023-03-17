import { SellerDomainEntity } from "../../../../entities";

export interface ISellerUpdatedSalaryResponse {
    success: boolean;
    data: SellerDomainEntity | null;
}