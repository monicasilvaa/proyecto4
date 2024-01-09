import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Center } from "./Center";

@Entity("business_hours")
export class BusinessHour {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dayOfWeek!: string;

  @Column({ type: "time" })
  openingTime!: string;

  @Column({ type: "time" })
  closingTime!: string;

  @ManyToOne(() => Center, (center) => center.businessHours)
  center!: Center;
}
