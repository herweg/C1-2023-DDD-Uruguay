import { CounterMySqlEntity } from '../../infrastructure/persistence/databases/mysql/entities/counter.entity';
import { CounterDomainEntity } from "../entities";

export interface ICounterDomainService<T extends CounterMySqlEntity = CounterMySqlEntity> {
    createCounter(counter: CounterDomainEntity): Promise<T>
    turnOffFreezer(counterId: string, turnOff: boolean): Promise<boolean>
    turnOnFreezer(counterId: string, turnOff: boolean): Promise<boolean>
}