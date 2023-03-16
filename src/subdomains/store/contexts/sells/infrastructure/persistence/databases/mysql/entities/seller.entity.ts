import { SellerDomainEntity } from "src/subdomains/store/contexts/sells";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { TicketMySqlEntity } from "./ticket.entity";

@Entity({ name: "seller" })
export class SellerMySqlEntity extends SellerDomainEntity {

    @PrimaryGeneratedColumn('uuid')
    sellerId: string

    @Column()
    name: string

    @Column()
    salary: number

    @OneToMany(() => TicketMySqlEntity, (ticket) => ticket.seller)
    ticket: TicketMySqlEntity
}