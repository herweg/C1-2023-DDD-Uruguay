import { PhoneValueObject, NameValueObject, IdValueObject } from "../../value-objects"
import { IClientDomainEntity } from "../interfaces"
import { v4 as uuid } from 'uuid';

export class ClientDomainEntity implements IClientDomainEntity {
    clientId?: string | IdValueObject
    phone?: number | PhoneValueObject
    name?: string | NameValueObject

    constructor(data?: IClientDomainEntity) {
        if (data?.clientId) this.clientId = data.clientId
        else this.clientId = new IdValueObject(uuid())
        if (data?.name) this.name = data.name
        if (data?.phone) this.phone = data.phone
    }
}
