import { Module } from '@nestjs/common';
import { GetPosterUseCase } from '../application/use-cases/counter/get-poster.use-case';
import { CounterController } from './controllers/counter.controller';
import { PosterController } from './controllers/poster.controller';
import { ProductController } from './controllers/product.controller';
import { MessagingModule } from './messaging/messaging.module';
import { PersistanceModule } from './persistence/persistance.module';

@Module({
    imports: [PersistanceModule, MessagingModule],
    controllers: [
        CounterController,
        PosterController,
        ProductController
    ],
    providers: [GetPosterUseCase],
    exports: [GetPosterUseCase]
})
export class StoreModule { }
