import { ClientDomainEntity, IProductDomainEntity, ITicketDomainEntity } from '../entities';

export interface IClientDomainService<T extends ClientDomainEntity = ClientDomainEntity> {
    createClient(client: T): Promise<T>
    getClient(client: string): Promise<T>
}