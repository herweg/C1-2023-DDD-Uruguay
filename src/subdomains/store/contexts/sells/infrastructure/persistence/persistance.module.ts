import { Module } from "@nestjs/common";
import { MySqlModule } from "./databases/mysql";

import { CounterService } from "./services/counter.service";
import { EventInfraService } from "./services/event.service";
import { PosterService } from "./services/poster.service";
import { ProductService } from "./services/product.service";

@Module({
    imports: [MySqlModule],
    providers:
        [
            EventInfraService,

            PosterService,
            ProductService,
            CounterService
        ],
    exports:
        [
            EventInfraService,

            PosterService,
            ProductService,
            CounterService
        ]
})
export class PersistanceModule { }