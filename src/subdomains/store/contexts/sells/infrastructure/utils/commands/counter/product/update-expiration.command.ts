import { IsDate, IsNumber, IsString } from "class-validator";

import { IProductUpdateExpirationCommand } from "src/subdomains/store";

export class ProductUpdateExpirationCommand implements IProductUpdateExpirationCommand {
    @IsString()
    productId: string
    @IsString()
    type: string
    @IsString()
    flavour: string
    @IsNumber()
    price: number
    @IsNumber()
    stock: number
    @IsDate()
    expirationDate: Date
}