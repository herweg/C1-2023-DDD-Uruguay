import { Module } from '@nestjs/common';
import { GetPosterUseCase } from '../application/use-cases/counter/get-poster.use-case';
import { CounterController } from './controllers/counter.controller';
import { MessagingModule } from './messaging/messaging.module';
import { PersistanceModule } from './persistence/persistance.module';

@Module({
    imports: [PersistanceModule, MessagingModule],
    controllers: [CounterController],
    providers: [GetPosterUseCase],
    exports: [GetPosterUseCase]
})
export class StoreModule { }
