import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmMySqlConfigService } from './configs/type-orm.mysql.service';
import {
    ClientMySqlEntity,
    CounterMySqlEntity,
    EventEntity,
    PosterMySqlEntity,
    ProductMySqlEntity
} from './entities';
import {
    CounterRepository,
    PosterRepository,
    ProductRepository
} from './repositories';
import { ClientRepository } from './repositories/client.repository';
import { EventRepository } from './repositories/event.repository';
import {
    EventService,
    PosterMySqlService,
    ProductMySqlService
} from './services';
import { ClientMySqlService } from './services/client.service';
import { CounterMySqlService } from './services/counter.service';



@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmMySqlConfigService,
        }),

        TypeOrmModule.forFeature([
            EventEntity,

            PosterMySqlEntity,
            ProductMySqlEntity,
            CounterMySqlEntity,
            ClientMySqlEntity
        ])
    ],
    providers: [
        TypeOrmMySqlConfigService,

        EventService,

        PosterMySqlService,
        ProductMySqlService,
        CounterMySqlService,
        ClientMySqlService,

        EventRepository,
        ProductRepository,
        PosterRepository,
        CounterRepository,
        ClientRepository
    ],
    exports: [
        EventService,

        PosterMySqlService,
        ProductMySqlService,
        CounterMySqlService,
        ClientMySqlService,

        EventRepository,
        ProductRepository,
        PosterRepository,
        CounterRepository,
        ClientRepository
    ]
})
export class MySqlModule { }