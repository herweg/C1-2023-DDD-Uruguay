import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Flavour } from 'src/subdomains/store/contexts/sells/domain/value-objects/common/flavour/flavour.value-object'
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
        if (!product) throw new BadRequestException(`findById Product with id: ${productId} not found`)
        return product
    }

    async create(entity: ProductMySqlEntity): Promise<ProductMySqlEntity> {
        return await this.repository.save(entity)
    }

    async update(productId: string, entity: ProductMySqlEntity): Promise<ProductMySqlEntity> {
        const productToUpdate = await this.repository.findOneBy({ productId })
        if (!productToUpdate) { throw new BadRequestException(`update Product with id: ${productId} not found`) }
        const updatedProduct = { ...productToUpdate, ...entity }
        return await this.repository.save(updatedProduct)
    }

    async delete(productId: string): Promise<boolean> {
        const product = await this.repository.findOneBy({ productId })
        if (!product) throw new BadRequestException(`delete Product with id: ${productId} not found`)
        await this.repository.delete(product)
        return true
    }
}