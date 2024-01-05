import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity("service")
export class Service {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length:50 })
    name!: string;

    @OneToMany ( () => Appointment, (appointment) => appointment.service)

    appointments!: Appointment[];

}
