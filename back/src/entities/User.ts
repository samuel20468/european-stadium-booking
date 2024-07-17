import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 50 })
    name: string

    @Column({ length: 100, unique: true })
    email: string

    @Column("date")
    birthdate: Date

    @Column({ unique: true })
    nDni: number

    @OneToOne(() => Credential)
    @JoinColumn({name: "credential_id"})
    credential: Credential

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]
};