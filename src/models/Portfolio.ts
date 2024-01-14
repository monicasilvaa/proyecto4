import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
import { Portfolio_file } from "./Portfolio_file";

@Entity("portfolios")
export class Portfolio {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    name!: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    created_at!: Date;

    @OneToOne(() => User, (user) => user.portfolios)
    @JoinColumn({ name: "employee_user_id" })
    employee_user!: User;

    @OneToMany ( () => Portfolio_file, (portfolio_file) => portfolio_file.portfolio)

    portfolioFiles!: Portfolio_file[];

}
