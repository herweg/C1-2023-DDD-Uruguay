import { ProductDomainEntity } from "../entities"

export interface IProductDomainService<T extends ProductDomainEntity = ProductDomainEntity> {
    createProduct(product: T): Promise<T>
    updateStock(product: T): Promise<T>
    updateProductPrice(product: T): Promise<T>
    updateProductType(product: T): Promise<T>
    updateProductExpiration(product: T): Promise<T>
    getProduct(productId: string): Promise<T>
}