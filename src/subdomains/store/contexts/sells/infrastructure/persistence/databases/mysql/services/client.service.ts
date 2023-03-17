import { Injectable } from "@nestjs/common";
import { IClientDomainService } from "src/subdomains/store/contexts/sells/domain";
import { ClientMySqlEntity } from "../entities";
import { ClientRepository } from "../repositories/client.repository";

@Injectable()
export class ClientMySqlService
    implements IClientDomainService<ClientMySqlEntity> {

    constructor(
        private readonly clientRepository: ClientRepository,
    ) { }

    createClient(client: ClientMySqlEntity): Promise<ClientMySqlEntity> {
        return this.clientRepository.create(client)
    }

    getClient(client: string): Promise<ClientMySqlEntity> {
        return this.clientRepository.findById(client)
    }
}