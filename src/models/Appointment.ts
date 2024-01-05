import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User";
import { Center } from "./Center";
import { Service } from "./Service";

@Entity("appointment")
export class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    appointment_date!: Date;


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

    @ManyToOne ( () => User, (user) => user.clientAppointments)
    @JoinColumn ({ name: "client_user_id" })
    
    clientUser!: User;

    @ManyToOne ( () => User, (user) => user.employeeAppointments)
    @JoinColumn ({ name: "employee_user_id" })
    
    employeeUser!: User;

    @ManyToOne ( () => Center, (center) => center.appointments)
    @JoinColumn ({ name: "center_id" })
    
    center!: Center;

    @ManyToOne ( () => Service, (service) => service.appointments)
    @JoinColumn ({ name: "service_id" })
    
    service!: Service;


}
