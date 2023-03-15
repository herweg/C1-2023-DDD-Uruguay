import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PosterMySqlEntity } from '../entities/poster.entity'

import { IRepository } from './base/repository.base'

@Injectable()
export class PosterRepository
    implements IRepository<PosterMySqlEntity>{

    constructor(
        @InjectRepository(PosterMySqlEntity)
        private readonly repository: Repository<PosterMySqlEntity>
    ) { }

    async findAll(): Promise<PosterMySqlEntity[]> {
        return await this.repository.find()
    }

    async findById(posterId: string): Promise<PosterMySqlEntity> {

        const poster = await this.repository.findOneBy({ posterId })
        if (!poster) throw new BadRequestException(`Poster with id: ${posterId} not found`)
        return poster
    }

    async create(entity: PosterMySqlEntity): Promise<PosterMySqlEntity> {
        const posterEntity = await this.repository.findOneBy({ posterId: entity.posterId })
        if (posterEntity) throw new BadRequestException(`Poster with id: ${entity.posterId} alredy exists`)
        return await this.repository.save(posterEntity)
    }

    async update(posterId: string, entity: PosterMySqlEntity): Promise<PosterMySqlEntity> {
        const posterToUpdate = await this.repository.findOneBy({ posterId })
        if (!posterToUpdate) { throw new BadRequestException(`Poster with id: ${posterId} not found`) }
        const updatedPoster = { ...posterToUpdate, ...entity }
        return await this.repository.save(updatedPoster)
    }

    async delete(posterId: string): Promise<boolean> {
        const poster = await this.repository.findOneBy({ posterId })
        if (!poster) throw new BadRequestException(`Poster with id: ${posterId} not found`)
        await this.repository.delete(poster)
        return true
    }
}