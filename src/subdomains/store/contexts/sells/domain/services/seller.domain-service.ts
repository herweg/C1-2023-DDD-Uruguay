import { SellerMySqlEntity } from "../../infrastructure/persistence/databases/mysql/entities/seller.entity"
import { IProductDomainEntity } from "../entities/interfaces/product.domain-entity.interface"
import { ITicketDomainEntity } from "../entities/interfaces/ticket.domain-entity.interface"

export interface ISellerDomainService<T extends SellerMySqlEntity = SellerMySqlEntity> {
    refound(ticket: ITicketDomainEntity): Promise<T>
    sell(ticket: ITicketDomainEntity): Promise<T>
    consultStock(product: IProductDomainEntity): Promise<T>
}