import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Role } from "./Role";
import { Appointment } from "./Appointment";
import { Portfolio } from "./Portfolio";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length:40 })
    username!: string;

    @Column({ length:255 })
    first_name!: string;

    @Column({ length:255 })
    last_name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ length: 255})
    password_hash!: string;

    @Column({ length: 15})
    phone!: string;

    @Column()
    birthday_date!: Date;

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

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role!: Role;

    @OneToMany ( () => Appointment, (appointment) => appointment.clientUser)

    clientAppointments!: Appointment[];

    @OneToMany ( () => Appointment, (appointment) => appointment.employeeUser)

    employeeAppointments!: Appointment[];

    @OneToMany ( () => Portfolio, (portfolio) => portfolio.employee_user)

    portfolios!: Portfolio[];


}
