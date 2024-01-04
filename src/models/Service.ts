import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length:50 })
    name!: string;


}
