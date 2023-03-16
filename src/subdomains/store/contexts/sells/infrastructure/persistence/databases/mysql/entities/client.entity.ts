import { ClientDomainEntity } from "src/subdomains/store/contexts/sells";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { TicketMySqlEntity } from "./ticket.entity";

@Entity({ name: "client" })
export class ClientMySqlEntity extends ClientDomainEntity {

    @PrimaryGeneratedColumn('uuid')
    clientId: string

    @Column()
    phone: number

    @Column()
    name: string

    @OneToMany(() => ClientMySqlEntity, (ticket) => ticket.clientId)
    ticket?: TicketMySqlEntity
}