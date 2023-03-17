import { SellerDomainEntity } from "../entities"

export interface ISellerDomainService<T extends SellerDomainEntity = SellerDomainEntity> {
    createSeller(seller: T): Promise<T>
    updateSalary(seller: T): Promise<T>
}