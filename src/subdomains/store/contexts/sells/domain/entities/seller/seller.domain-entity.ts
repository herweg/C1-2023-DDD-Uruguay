import { IdValueObject, NameValueObject, SalaryValueObject } from "../../value-objects";
import { ISellerDomainEntity } from "../interfaces";
import { v4 as uuid } from 'uuid';

export class SellerDomainEntity implements ISellerDomainEntity {
    sellerId?: string | IdValueObject;
    name?: string | NameValueObject;
    salary?: number | SalaryValueObject;

    constructor(data?: ISellerDomainEntity) {
        if (data?.sellerId) this.sellerId = data.sellerId
        else this.sellerId = new IdValueObject(uuid())
        if (data?.name) this.name = data.name
        if (data?.salary) this.salary = data.salary
    }
}