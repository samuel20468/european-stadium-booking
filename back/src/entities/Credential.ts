import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "credentials" })
export class Credential {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 20, unique: true })
    username: string

    @Column({ length: 150 })
    password: string
};