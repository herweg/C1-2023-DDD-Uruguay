import { Injectable } from '@nestjs/common'

import { EventEntity } from '../entities/event.entity'
import { EventRepository } from '../repositories/event.repository'

@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository) { }

    createEvent(event: EventEntity): Promise<EventEntity> {
        return this.eventRepository.create(event)
    }
}