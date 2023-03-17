import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('event', { schema: 'public' })
export class EventEntity {

  @PrimaryGeneratedColumn('uuid')
  eventID: string;

  @Column()
  type: string;

  @Column({ length: 1000 })
  data: string;

  @Column()
  createdAt: string;
}