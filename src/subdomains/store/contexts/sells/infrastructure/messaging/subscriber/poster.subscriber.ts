import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { EventInfraEntity } from "../../persistence/entities/event.entity";
import { EventInfraService } from "../../persistence/services/event.service";

@Controller()
export class PosterEventController {

    constructor(private readonly eventService: EventInfraService) { }
    
    /**
     * EventPattern se utiliza para definir un patrón de evento de Kafka
     * al que el controlador responderá.
     * 
     * Payload se utiliza para extraer los datos del mensaje del evento.
     *
     * KafkaContext que se utiliza para acceder a los metadatos del contexto de Kafka.
     * 
     * En el contexto de los eventos Kafka, el término "payload"
     * se refiere a los datos contenidos en el mensaje del evento. 
     * En otras palabras, el payload es la carga útil de información 
     * que se envía en el mensaje de Kafka.
     * 
     * @param {*} data
     * @param {KafkaContext} context
     * @memberof PosterController
     */

    @EventPattern('store.poster-created')
    posterCreated(@Payload() data: any, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        //const poster: PosterEntity = JSON.parse(JSON.stringify(data.data))
        const event = new EventInfraEntity();
        event.data = JSON.stringify(data);
        event.type = 'store.poster-created';
        event.createdAt = Date();
        this.eventService.createEvent(event)
    }

    @EventPattern('store.poster-updated-image')
    updatedImage(@Payload() data: any, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        //const poster: PosterEntity = JSON.parse(JSON.stringify(data.data))
        const event = new EventInfraEntity();
        event.data = JSON.stringify(data);
        event.type = 'store.poster-updated-image';
        event.createdAt = Date();
        this.eventService.createEvent(event)
    }

    @EventPattern('store.poster-updated-price')
    updatedPrice(@Payload() data: any, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        //const poster: PosterEntity = JSON.parse(JSON.stringify(data.data))
        const event = new EventInfraEntity();
        event.data = JSON.stringify(data);
        event.type = 'store.poster-updated-price';
        event.createdAt = Date();
        this.eventService.createEvent(event)
    }

    @EventPattern('store.poster-updated-type')
    updatedType(@Payload() data: any, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        //const poster: PosterEntity = JSON.parse(JSON.stringify(data.data))
        const event = new EventInfraEntity();
        event.data = JSON.stringify(data);
        event.type = 'store.poster-updated-type';
        event.createdAt = Date();
        this.eventService.createEvent(event)
    }
}