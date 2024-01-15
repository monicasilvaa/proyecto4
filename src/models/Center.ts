import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Appointment } from "./Appointment";
import { User } from "./User";
import { BusinessHour } from "./BusinessHour";

@Entity("centers")
export class Center {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    address!: string;

    @Column()
    phone!: string;

    @OneToMany ( () => Appointment, (appointment) => appointment.center)

    appointments!: Appointment[];

    @ManyToMany(() => User, (user) => user.centers)
    @JoinTable({ 
      name: 'employeeCenters',
      joinColumn: { name: "center_id"},
      inverseJoinColumn: { name: "employee_id" },
   })
    users!: User[];

    @OneToMany(() => BusinessHour, (businessHour) => businessHour.center)
    businessHours!: BusinessHour[];

}
