import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { EventEntity } from "../../persistence/databases/mysql/entities/event.entity";
import { ProductEntity } from "../../persistence/entities";
import { ProductService } from "../../persistence/services";

@Controller()
export class ProductController {

    constructor(private readonly productService: ProductService) {}

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
     * @memberof ProductController
     */

    @EventPattern('store.product-created')
    createProduct(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        const product: ProductEntity = JSON.parse(JSON.stringify(data.data))
        this.productService.createProduct(product)
    }
    
    @EventPattern('store.product-updated-expiration')
    updatedExpiration(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        const product: ProductEntity = JSON.parse(JSON.stringify(data.data))
        this.productService.updateProductExpiration(product)
    }

    @EventPattern('store.product-updated-price')
    updatedPrice(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

        const product: ProductEntity = JSON.parse(JSON.stringify(data.data))
        this.productService.updateProductPrice(product)
    }

    @EventPattern('store.product-updated-stock')
    updatedStock(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        const product: ProductEntity = JSON.parse(JSON.stringify(data.data))
        this.productService.updateStock(product)
    }

    @EventPattern('store.product-updated-type')
    updatedType(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
        const product: ProductEntity = JSON.parse(JSON.stringify(data.data))
        this.productService.updateProductType(product)
    }
}