import {
    IdValueObject,
    PosterTypeValueObject,
    FlavourValueObject,
    PriceValueObject,
    StockValueObject,
    ImageValueObject,
    Flavour,
    ImgType
} from "../../value-objects";
import { IPosterDomainEntity } from "../interfaces"
import { v4 as uuid } from 'uuid'

export class PosterDomainEntity implements IPosterDomainEntity {
    posterId?: string | IdValueObject
    type: ImgType | PosterTypeValueObject
    flavour: Flavour | FlavourValueObject
    price?: number | PriceValueObject
    stock?: number | StockValueObject
    image: string | ImageValueObject

    constructor(data?: IPosterDomainEntity) {
        if (data?.posterId) this.posterId = data.posterId
        else this.posterId = new IdValueObject(uuid())
        if (data?.flavour) this.flavour = data.flavour
        if (data?.image) this.image = data.image
        if (data?.price) this.price = data.price
        if (data?.stock) this.stock = data.stock
        if (data?.type) this.type = data.type
    }
}
