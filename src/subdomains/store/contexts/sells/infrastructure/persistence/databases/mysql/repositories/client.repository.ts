import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'
import { ClientMySqlEntity } from '../entities'

import { IRepository } from './base/repository.base'

@Injectable()
export class ClientRepository
    implements IRepository<ClientMySqlEntity>{

    constructor(
        @InjectRepository(ClientMySqlEntity)
        private readonly repository: Repository<ClientMySqlEntity>
    ) { }

    async findAll(): Promise<ClientMySqlEntity[]> {
        return await this.repository.find()
    }

    async findById(clientId: string): Promise<ClientMySqlEntity> {
        return await this.repository.findOneBy({ clientId })
    }

    async create(client: ClientMySqlEntity): Promise<ClientMySqlEntity> {
        return await this.repository.save(client)
    }

    async update(clientId: string, entity: ClientMySqlEntity): Promise<ClientMySqlEntity> {
        const clientToUpdate = await this.repository.findOneBy({ clientId })
        if (!clientToUpdate) { throw new BadRequestException(`update Client with id: ${clientId} not found`) }
        const updatedClient = { ...clientToUpdate, ...entity }
        return await this.repository.save(updatedClient)
    }

    async delete(clientId: string): Promise<boolean> {
        const client = await this.repository.findOneBy({ clientId })
        if (!client) throw new BadRequestException(`delete Client with id: ${clientId} not found`)
        await this.repository.delete(client)
        return true
    }
}