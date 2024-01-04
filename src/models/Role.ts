import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";

@Entity("role")
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length:50 })
    name!: string;

    @OneToMany(() => User, (user) => user.role)
    users!: User[];
}
