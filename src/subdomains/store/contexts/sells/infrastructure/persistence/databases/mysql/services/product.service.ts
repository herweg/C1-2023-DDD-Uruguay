import { Injectable } from "@nestjs/common";
import { ICounterCreateProductCommand, IProductDomainService, IProductUpdatePriceCommand, IProductUpdateStockCommand } from "src/subdomains/store/contexts/sells/domain";
import { IProductUpdateExpirationCommand } from "src/subdomains/store/contexts/sells/domain/interfaces/commands/counter/product/update-expiration.command";
import { IProductUpdateTypeCommand } from "src/subdomains/store/contexts/sells/domain/interfaces/commands/counter/product/update-type.command";
import { ProductMySqlEntity } from "../entities/product.entity";
import { ProductRepository } from '../repositories/product.repository';
import { ProductEntity } from '../../../entities/product.entity';

@Injectable()
export class ProductMySqlService
    implements IProductDomainService<ProductMySqlEntity> {

    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async createProduct(product: ICounterCreateProductCommand): Promise<ProductMySqlEntity> {
        return this.productRepository.create(product)
    }

    async updateStock(product: ProductMySqlEntity): Promise<ProductMySqlEntity> {
        return this.productRepository.update(product.productId, product)
    }

    async updateProductPrice(product: ProductMySqlEntity): Promise<ProductMySqlEntity> {
        return this.productRepository.update(product.productId, product)
    }

    async updateProductType(product: ProductMySqlEntity): Promise<ProductMySqlEntity> {
        return this.productRepository.update(product.productId, product)
    }

    async updateProductExpiration(product: ProductMySqlEntity): Promise<ProductMySqlEntity> {
        return this.productRepository.update(product.productId, product)
    }

    getProduct(productId: string): Promise<ProductMySqlEntity> {
        return this.productRepository.findById(productId)
    }
}