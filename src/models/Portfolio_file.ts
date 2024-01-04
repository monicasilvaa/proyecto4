import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Portfolio } from "./Portfolio";

@Entity()
export class Portfolio_file {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length:50 })
    name!: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    created_at!: Date;

    @ManyToOne(() => Portfolio, (portfolio) => portfolio.portfolioFiles)
    @JoinColumn({ name: "portfolio_id" })
    portfolio!: Portfolio;

}