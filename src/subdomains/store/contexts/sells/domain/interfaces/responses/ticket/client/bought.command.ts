import { ClientDomainEntity } from "../../../../entities";

export interface IClientBoughtResponse {
    success: boolean;
    data: ClientDomainEntity | null;
}