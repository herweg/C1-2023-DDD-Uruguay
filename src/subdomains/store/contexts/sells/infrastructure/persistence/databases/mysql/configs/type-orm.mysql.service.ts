import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CounterMySqlEntity, PosterMySqlEntity, ProductMySqlEntity } from "../entities";

@Injectable()
export class TypeOrmMySqlConfigService implements TypeOrmOptionsFactory {

    constructor(private readonly configService: ConfigService) { }
    
    async createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> {
        //const dbHost = this.configService.get<string>('DB_HOST')
        //const dbPort = this.configService.get<number>('DB_PORT')
        //const dbUser = this.configService.get<string>('DB_USER')
        //const dbName = this.configService.get<string>('DB_NAME')

        // DB_HOST = localhost
        // DB_PORT = 3306
        // DB_USER = root
        // DB_PASSWORD = 1234
        // DB_NAME = icecream_db

        // console.log(`Connecting to MySQL database at ${dbHost}:${dbPort} as user ${dbUser} on database ${dbName}`);

        return {
            type: 'mysql',
            host: "localhost",
            port: 3306,
            username: "root",
            password: "1234",
            database: "icecream_db",
            entities: [
                PosterMySqlEntity,
                ProductMySqlEntity,
                CounterMySqlEntity
            ],
            synchronize: true,
            logging: true
        }
    }
}