import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ClientMySqlEntity, CounterMySqlEntity, PosterMySqlEntity, ProductMySqlEntity, SellerMySqlEntity, TicketMySqlEntity } from "../entities";
import { EventEntity } from "../entities/event.entity";

@Injectable()
export class TypeOrmMySqlConfigService implements TypeOrmOptionsFactory {

    constructor(private readonly configService: ConfigService) { }
    
    async createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> {
        const dbHost = this.configService.get<string>('DB_HOST')
        const dbPort = this.configService.get<number>('DB_PORT')
        const dbUser = this.configService.get<string>('DB_USER')
        const dbName = this.configService.get<string>('DB_NAME')
        const dbPass = this.configService.get<string>('DB_PASSWORD')

        // DB_HOST = localhost
        // DB_PORT = 3306
        // DB_USER = root
        // DB_PASSWORD = 1234
        // DB_NAME = icecream_db

        // console.log(`Connecting to MySQL database at ${dbHost}:${dbPort} as user ${dbUser} on database ${dbName}`);

        return {
            type: 'mysql',
            host: dbHost,
            port: dbPort,
            username: dbUser,
            password: dbPass,
            database: dbName,
            entities: [
                EventEntity,

                PosterMySqlEntity,
                ProductMySqlEntity,
                CounterMySqlEntity,
                ClientMySqlEntity,
                SellerMySqlEntity,
                TicketMySqlEntity
            ],
            synchronize: true,
            logging: true
        }
    }
}