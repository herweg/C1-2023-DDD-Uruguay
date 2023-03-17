import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { CreatedCounterPublisher } from "./publisher/counter/created-counter.message-publisher";
import { CreatedPosterPublisher } from "./publisher/counter/created-poster.message-publisher";
import { CreatedProductPublisher } from "./publisher/counter/created-product.message-publisher";
import { GettedPosterPublisher } from "./publisher/counter/getted-poster.message-publisher";
import { GettedProductPublisher } from "./publisher/counter/getted-product.message-publisher";
//Poster
import { UpdatedImagePublisher } from "./publisher/counter/poster/updated-image.message-publisher";
import { UpdatedPricePublisher } from "./publisher/counter/poster/updated-price.message-publisher";
import { UpdatedTypePublisher } from "./publisher/counter/poster/updated-type.message-publisher";
//Product
import { UpdatedExpirationPublisher } from "./publisher/counter/product/updated-expiration.message-publisher";
import { UpdatedStockPublisher } from "./publisher/counter/product/updated-stock.message-publisher";
import { UpdatedPricePublisher as ProductUpdatedPricePublisher } from "./publisher/counter/product/updated-price.message-publisher";
import { UpdatedTypePublisher as ProductUpdatedTypePublisher } from "./publisher/counter/product/updated-type.message-publisher";
import { PersistanceModule } from "../persistence/persistance.module";
import { CreatedClientPublisher } from "./publisher/ticket/created-client.message-publisher";

/**
 * name: el nombre del cliente.
 * Este es un identificador único que se utiliza para referenciar este cliente
 * en otras partes de la aplicación.
 * 
 * transport: el tipo de transporte utilizado para conectarse a Kafka.
 * En este caso, se utiliza Transport.KAFKA,
 * que indica que se conectará a un servidor Kafka. 
 * 
 * options: un objeto que define las opciones de configuración
 * específicas para el cliente Kafka. En este caso,
 * solo se especifica un objeto client que define los brokers
 * a los que se conectará el cliente. Los brokers son los servidores
 * de Kafka que gestionan los mensajes y actúan como intermediarios
 * entre los productores y los consumidores. En este ejemplo,
 * se especifica que el cliente se conectará a un solo broker alojado
 * en localhost en el puerto 9092.
 *
 * @export
 * @class MessagingModule
 */
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'STORE_CONTEXT',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092'],
                    },
                },
            },
        ]),
        PersistanceModule
    ],
    controllers: [

    ],
    providers: [
        //Counter
        CreatedCounterPublisher,
        CreatedPosterPublisher,
        CreatedProductPublisher,
        GettedPosterPublisher,
        GettedProductPublisher,

        //product
        UpdatedExpirationPublisher,
        UpdatedStockPublisher,
        ProductUpdatedPricePublisher,
        ProductUpdatedTypePublisher,

        //poster
        UpdatedImagePublisher,
        UpdatedPricePublisher,
        UpdatedTypePublisher,

        //Client
        CreatedClientPublisher
    ],
    exports: [
        //counter
        CreatedCounterPublisher,
        CreatedPosterPublisher,
        CreatedProductPublisher,
        GettedPosterPublisher,
        GettedProductPublisher,

        //product
        UpdatedExpirationPublisher,
        UpdatedStockPublisher,
        ProductUpdatedPricePublisher,
        ProductUpdatedTypePublisher,

        //poster
        UpdatedImagePublisher,
        UpdatedPricePublisher,
        UpdatedTypePublisher,
        
        //Client
        CreatedClientPublisher
    ]
})
export class MessagingModule { }