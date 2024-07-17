import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HourMinute, Stadium, Status } from "../resources/resources";
import { User } from "./User";

@Entity({ name: "appointments" })
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("enum", {enum: Stadium})
    stadium: Stadium

    @Column("date")
    date: Date

    @Column("time", { precision: 0 })
    time: HourMinute

    @Column({ length: 9 })
    status: Status

    @ManyToOne(() => User, (user) => user.appointments)
    user: User
};