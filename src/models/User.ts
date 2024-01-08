import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Role } from "./Role";
import { Appointment } from "./Appointment";
import { Portfolio } from "./Portfolio";
import { Center } from "./Center";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password_hash!: string;

    @Column()
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

    @ManyToMany(() => Center, (center) => center.users)
    @JoinTable({ 
        name: 'employeeCenters',
        joinColumn: {
          name: "center_id",
          referencedColumnName: "id",
       },
       inverseJoinColumn: {
          name: "employee_id",
          referencedColumnName: "id",
       },
    })
    centers!: Center[];


}
