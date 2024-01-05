import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Appointment } from "./Appointment";
import { EmployeeCenter } from "./EmployeeCenter";

@Entity("center")
export class Center {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length:50 })
    name!: string;

    @Column({ length:255 })
    address!: string;

    @Column({length: 15})
    phone!: string;

    @Column({length: 100})
    business_hours!: string; 

    @OneToMany ( () => Appointment, (appointment) => appointment.center)

    appointments!: Appointment[];

    @OneToMany(() => EmployeeCenter, (employeeCenter) => employeeCenter.center)
    employeeCenter!: EmployeeCenter[];

}
