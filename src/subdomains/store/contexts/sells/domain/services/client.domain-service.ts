import { ClientMySqlEntity } from '../../infrastructure/persistence/databases/mysql/entities/client.entity';
import { IProductDomainEntity, ITicketDomainEntity } from '../entities';

export interface IClientDomainService<T extends ClientMySqlEntity = ClientMySqlEntity> {
    askRefound(ticket: ITicketDomainEntity): Promise<T>
    buy(ticket: ITicketDomainEntity): Promise<T>
    consultStock(product: IProductDomainEntity): Promise<T>
}