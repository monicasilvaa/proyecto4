import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity()
export class Center {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length:50 })
    name!: string;

    @Column({ length:200 })
    location!: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    register_date!: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    modified_date!: Date;

    @DeleteDateColumn()
    deleted_date?: Date; 

    @OneToMany ( () => Appointment, (appointment) => appointment.center)

    appointments!: Appointment[];

}
