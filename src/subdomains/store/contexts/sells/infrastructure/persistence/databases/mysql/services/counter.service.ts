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
import { PosterMySqlService } from './poster.service';
import { ProductMySqlService } from './product.service';

@Injectable()
export class CounterMySqlService
    implements ICounterDomainService<CounterMySqlEntity> {
    constructor(
        private readonly counterRepository: CounterRepository,
        private readonly posterMySqlService: PosterMySqlService,
        private readonly productMySqlService: ProductMySqlService
    ) { }

    async createCounter(counter: CounterMySqlEntity): Promise<CounterMySqlEntity> {
        //const checkCounter = await this.counterRepository.findById(counter.counterId)
        //if (checkCounter) throw new BadRequestException(`Counter with id: ${counter.counterId} alredy exists`)

        return await this.counterRepository.create(counter)
    }


    turnOffFreezer(counterId: string, turnOff: boolean): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    turnOnFreezer(counterId: string, turnOff: boolean): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}