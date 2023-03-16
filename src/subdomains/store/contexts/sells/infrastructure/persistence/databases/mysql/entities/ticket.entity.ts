import { TicketDomainEntity } from "src/subdomains/store/contexts/sells/domain/entities/ticket/ticket.domain-entity.ts";
import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column } from 'typeorm';
import { ClientMySqlEntity } from "./client.entity";
import { SellerMySqlEntity } from "./seller.entity";


@Entity("ticket", { schema: "public" })
export class TicketMySqlEntity extends TicketDomainEntity {
    @PrimaryGeneratedColumn('uuid')
    ticketId: string

    @Column()
    stock: number

    @Column()
    image: string

    @Column()
    productId: string

    @Column()
    totalPrice: number

    @Column()
    type: string

    @Column()
    quantity: number

    @Column()
    date: Date

    @ManyToOne(() => SellerMySqlEntity, (seller) => seller.ticket,
        {
            cascade: ['insert', 'update'],
        },
    )
    @JoinColumn()
    seller: SellerMySqlEntity;


    @ManyToOne(() => ClientMySqlEntity, (client) => client.ticket,
        {
            cascade: ['insert', 'update'],
        },
    )
    @JoinColumn()
    client: ClientMySqlEntity
}