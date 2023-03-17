import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { PosterEntity } from "../../persistence/entities";
import { EventInfraEntity } from "../../persistence/entities/event.entity";
import { PosterService } from "../../persistence/services";

@Controller()
export class PosterEventController {
    constructor(private readonly posterService: PosterService) { }
    
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

    // @EventPattern('store.poster-created')
    // posterCreated(@Payload() data: EventInfraEntity, @Ctx() context: KafkaContext) {

    //     console.log('--------------------------------------')
    //     console.log('Data: ', data.data)
    //     console.log('--------------------------------------')
    //     console.log('Context: ', context)
    //     console.log('--------------------------------------')
    //     const poster: PosterEntity = JSON.parse(JSON.stringify(data.data))
    //     this.posterService.createPoster(poster)
    // }

    @EventPattern('store.poster-updated-image')
    updatedImage(@Payload() data: EventInfraEntity, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        const poster: PosterEntity = JSON.parse(JSON.stringify(data.data))
        this.posterService.updateImage(poster)
    }

    @EventPattern('store.poster-updated-price')
    updatedPrice(@Payload() data: EventInfraEntity, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        const poster: PosterEntity = JSON.parse(JSON.stringify(data.data))
        this.posterService.updatePosterPrice(poster)
    }

    @EventPattern('store.poster-updated-type')
    updatedType(@Payload() data: EventInfraEntity, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        const poster: PosterEntity = JSON.parse(JSON.stringify(data.data))
        this.posterService.updatePosterType(poster)
    }
}