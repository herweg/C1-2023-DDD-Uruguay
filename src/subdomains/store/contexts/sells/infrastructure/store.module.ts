import { Module } from '@nestjs/common';
import { CounterController } from './controllers/counter.controller';
import { PosterController } from './controllers/poster.controller';
import { ProductController } from './controllers/product.controller';
import { MessagingModule } from './messaging/messaging.module';
import { PosterEventController } from './messaging/subscriber/poster.subscriber';
import { CounterEventController } from './messaging/subscriber/counter.subscriber';
import { ProductEventController } from './messaging/subscriber/product.subscriber';
import { PersistanceModule } from './persistence/persistance.module';
import { ClientController } from './controllers/client.controller';

@Module({
    imports: [PersistanceModule, MessagingModule],
    controllers: [
        CounterController,
        PosterController,
        ProductController,
        ClientController,

        CounterEventController,
        PosterEventController,
        ProductEventController,
    ],
    providers: [],
    exports: []
})
export class StoreModule { }
