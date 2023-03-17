import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmMySqlConfigService } from './configs/type-orm.mysql.service';
import {
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
import { EventRepository } from './repositories/event.repository';
import {
    EventService,
    PosterMySqlService,
    ProductMySqlService
} from './services';
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
            CounterMySqlEntity
        ])
    ],
    providers: [
        TypeOrmMySqlConfigService,

        EventService,

        PosterMySqlService,
        ProductMySqlService,
        CounterMySqlService,

        EventRepository,
        ProductRepository,
        PosterRepository,
        CounterRepository
    ],
    exports: [
        EventService,

        PosterMySqlService,
        ProductMySqlService,
        CounterMySqlService,

        EventRepository,
        ProductRepository,
        PosterRepository,
        CounterRepository
    ]
})
export class MySqlModule { }