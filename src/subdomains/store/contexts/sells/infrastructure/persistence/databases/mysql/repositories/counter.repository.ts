import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CounterMySqlEntity } from '../entities/counter.entity'

import { IRepository } from './base/repository.base'

@Injectable()
export class CounterRepository
    implements IRepository<CounterMySqlEntity>{

    constructor(
        @InjectRepository(CounterMySqlEntity)
        private readonly repository: Repository<CounterMySqlEntity>
    ) { }

    async findAll(): Promise<CounterMySqlEntity[]> {
        return await this.repository.find()
    }

    async findById(counterId: string): Promise<CounterMySqlEntity> {

        const counter = await this.repository.findOneBy({ counterId })
        if (!counter) throw new BadRequestException(`Counter with id: ${counterId} not found`)
        return counter
    }

    async create(entity: CounterMySqlEntity): Promise<CounterMySqlEntity> {
        const counterEntity = await this.repository.findOneBy({ counterId: entity.counterId })
        if (counterEntity) throw new BadRequestException(`Counter with id: ${entity.counterId} alredy exists`)
        return await this.repository.save(counterEntity)
    }

    async update(counterId: string, entity: CounterMySqlEntity): Promise<CounterMySqlEntity> {
        const counterToUpdate = await this.repository.findOneBy({ counterId })
        if (!counterToUpdate) { throw new BadRequestException(`Counter with id: ${counterId} not found`) }
        const updatedCounter = { ...counterToUpdate, ...entity }
        return await this.repository.save(updatedCounter)
    }

    async delete(counterId: string): Promise<boolean> {
        const counter = await this.repository.findOneBy({ counterId })
        if (!counter) throw new BadRequestException(`Counter with id: ${counterId} not found`)
        await this.repository.delete(counter)
        return true
    }
}