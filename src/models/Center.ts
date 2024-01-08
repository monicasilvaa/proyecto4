import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Appointment } from "./Appointment";
import { User } from "./User";

@Entity("centers")
export class Center {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    address!: string;

    @Column()
    phone!: string;

    @Column()
    business_hours!: string; 

    @OneToMany ( () => Appointment, (appointment) => appointment.center)

    appointments!: Appointment[];

    @ManyToMany(() => User, (user) => user.centers)
    @JoinTable({ 
        name: 'employeeCenters',
        joinColumn: {
          name: "employee_id",
          referencedColumnName: "id",
       },
       inverseJoinColumn: {
          name: "center_id",
          referencedColumnName: "id",
       },
    })
    users!: User[];

}
