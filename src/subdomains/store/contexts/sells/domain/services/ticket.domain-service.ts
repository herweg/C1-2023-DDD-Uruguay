import { TicketMySqlEntity } from "../../infrastructure/persistence/databases/mysql/entities/ticket.entity"
import { ITicketCreateTicketCommand } from "../interfaces/commands/ticket/create-ticket.command"

export interface ITicketDomainService<T extends TicketMySqlEntity = TicketMySqlEntity> {
    createTicket(counter: ITicketCreateTicketCommand): Promise<T>
    createSeller(poster: ITicketCreateTicketCommand): Promise<T>
    createClient(poster: ITicketCreateTicketCommand): Promise<T>
    makeRefound(posterId: string): Promise<T>
}