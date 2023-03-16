
import { Flavour, ImgType, PosterDomainEntity } from "src/subdomains/store/contexts/sells";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { CounterMySqlEntity } from './counter.entity';



@Entity({ name: "poster" })
export class PosterMySqlEntity extends PosterDomainEntity {

    @PrimaryGeneratedColumn('uuid')
    posterId: string

    @Column()
    type: ImgType

    @Column()
    flavour: Flavour

    @Column()
    price: number

    @Column()
    stock: number

    @Column()
    image: string

    @OneToMany(() => CounterMySqlEntity, (counter) => counter.poster)
    counter?: CounterMySqlEntity
}