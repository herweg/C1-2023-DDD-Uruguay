import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from 'rxjs'
import { IEventPublisher } from "src/libs";
import { ClientCreatedClientEventPublisherBase } from "../../../../domain/events/publishers/ticket/client/created-client.event-publisher";
import { ClientEntity } from "../../../persistence/entities/client.entity";

@Injectable()
export class CreatedClientPublisher extends ClientCreatedClientEventPublisherBase {
    constructor(

        @Inject('STORE_CONTEXT') private readonly proxy: ClientProxy,
    ) {
        super(proxy as unknown as IEventPublisher);
    }

    /**
     * El método emit en CreatedProductPublisher utiliza lastValueFrom de rxjs
     *  para enviar un mensaje al broker de mensajería utilizando el ClientProxy inyectado.
     *  El mensaje que se envía es un objeto pattern y data. pattern es una cadena
     *  que identifica el tipo de evento que se está enviando,
     *  y data es la información específica del evento que se está enviando.
     *
     * @template Result
     * @template Input
     * @param {*} pattern
     * @param {Input} data
     * @return {*}  {Promise<Result>}
     * @memberof CreatedProductPublisher
     */
    emit<Result = any, Input = ClientEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}