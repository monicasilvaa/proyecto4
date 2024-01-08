import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Portfolio } from "./Portfolio";

@Entity("portfolio_files")
export class Portfolio_file {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
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
