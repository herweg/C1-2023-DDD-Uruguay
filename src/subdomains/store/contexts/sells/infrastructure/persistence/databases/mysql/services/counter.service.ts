import { Injectable, BadRequestException } from '@nestjs/common';
import {
    ICounterCreateCounterCommand,
    ICounterCreatePosterCommand,
    ICounterCreateProductCommand,
    ICounterDomainService,
} from "src/subdomains/store/contexts/sells/domain";
import { PosterMySqlEntity, ProductMySqlEntity } from '../entities';
import { CounterMySqlEntity } from "../entities/counter.entity";
import { CounterRepository, PosterRepository, ProductRepository } from "../repositories";

@Injectable()
export class CounterMySqlService
    implements ICounterDomainService<CounterMySqlEntity> {
    constructor(
        private readonly counterRepository: CounterRepository,
        private readonly posterRepository: PosterRepository,
        private readonly productRepository: ProductRepository
    ) { }

    async createCounter(counter: ICounterCreateCounterCommand): Promise<CounterMySqlEntity> {
        const checkCounter = await this.counterRepository.findById(counter.counterId)
        if (checkCounter) throw new BadRequestException(`Counter with id: ${counter.counterId} alredy exists`)

        const setPoster = await this.getPoster(counter.posterId)
        const setProduct = await this.getProduct(counter.productId)

        const newCounter = new CounterMySqlEntity
        newCounter.product = setProduct
        newCounter.poster = setPoster

        return await this.counterRepository.create(newCounter)
    }

    async createPoster(poster: ICounterCreatePosterCommand): Promise<PosterMySqlEntity> {
        //const checkPoster = await this.posterRepository.findById(poster.posterId)
        //if (checkPoster) throw new BadRequestException(`createPoster Poster with id: ${poster.posterId} alredy exists`)
        const newPoster = await this.posterRepository.create(poster)
        return newPoster
    }

    async createProduct(product: ICounterCreateProductCommand): Promise<ProductMySqlEntity> {
        //const checkProduct = await this.productRepository.findById(product.productId)
        //if (checkProduct) throw new BadRequestException(`createProduct Product with id: ${product.productId} alredy exists`)
        const newProduct = this.productRepository.create(product)
        return newProduct
    }

    async getPoster(posterId: string): Promise<PosterMySqlEntity> {
        const checkPoster = await this.posterRepository.findById(posterId)
        if (!checkPoster) throw new BadRequestException(`getPoster Poster with id: ${posterId} not found`)
        return checkPoster
    }

    async getProduct(productId: string): Promise<ProductMySqlEntity> {
        const checkProduct = await this.productRepository.findById(productId)
        if (!checkProduct) throw new BadRequestException(`getProduct Product with id: ${productId} not found`)
        return checkProduct
    }

    turnOffFreezer(counterId: string, turnOff: boolean): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    turnOnFreezer(counterId: string, turnOff: boolean): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}