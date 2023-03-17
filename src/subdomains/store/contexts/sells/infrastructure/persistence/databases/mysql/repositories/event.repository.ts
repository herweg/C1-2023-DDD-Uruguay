import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { IRepository } from './base/repository.base';

@Injectable()
export class EventRepository
  implements IRepository<EventEntity>
{
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) { }

  async findAll(): Promise<EventEntity[]> {
    return await this.eventRepository.find();
  }

  async create(
    entity: EventEntity,
  ): Promise<EventEntity> {
    return await this.eventRepository.save(entity);
  }

  findById(id: string): Promise<EventEntity> {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: EventEntity): Promise<EventEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}