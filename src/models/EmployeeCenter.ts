import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
import { Center } from "./Center";

@Entity("employeeCenter")
export class EmployeeCenter {
        @PrimaryGeneratedColumn()
        id!: number;
    
        @ManyToOne(() => User, (user) => user.employeeCenter)
        @JoinColumn({ name: 'id_employee' })
        employee!: User;
    
        @ManyToOne(() => Center, (center) => center.employeeCenter)
        @JoinColumn({ name: 'id_center' })
        center!: Center;

}
