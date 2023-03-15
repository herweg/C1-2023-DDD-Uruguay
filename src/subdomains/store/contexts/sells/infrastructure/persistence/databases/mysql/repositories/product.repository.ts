import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductMySqlEntity } from '../entities/product.entity'

import { IRepository } from './base/repository.base'

@Injectable()
export class ProductRepository
    implements IRepository<ProductMySqlEntity>{

    constructor(
        @InjectRepository(ProductMySqlEntity)
        private readonly repository: Repository<ProductMySqlEntity>
    ) { }

    async findAll(): Promise<ProductMySqlEntity[]> {
        return await this.repository.find()
    }

    async findById(productId: string): Promise<ProductMySqlEntity> {

        const product = await this.repository.findOneBy({ productId })
        if (!product) throw new BadRequestException(`Product with id: ${productId} not found`)
        return product
    }

    async create(entity: ProductMySqlEntity): Promise<ProductMySqlEntity> {
        const productEntity = await this.repository.findOneBy({ productId: entity.productId })
        if (productEntity) throw new BadRequestException(`Product with id: ${entity.productId} alredy exists`)
        return await this.repository.save(productEntity)
    }

    async update(productId: string, entity: ProductMySqlEntity): Promise<ProductMySqlEntity> {
        const productToUpdate = await this.repository.findOneBy({ productId })
        if (!productToUpdate) { throw new BadRequestException(`Product with id: ${productId} not found`) }
        const updatedProduct = { ...productToUpdate, ...entity }
        return await this.repository.save(updatedProduct)
    }

    async delete(productId: string): Promise<boolean> {
        const product = await this.repository.findOneBy({ productId })
        if (!product) throw new BadRequestException(`Product with id: ${productId} not found`)
        await this.repository.delete(product)
        return true
    }
}