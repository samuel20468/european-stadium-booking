import { HourMinute, Stadium, Status } from "../resources/resources";

export interface DtoUser {
    name: string;
    email: string;
    birthdate: Date;
    nDni: number;
    username: string;
    password: string;
};
export interface DtoAppointment{
    stadium: Stadium,
    date: Date,
    time: HourMinute,
    status: Status,
};

export interface DtoOnlyCredential {
    username: string,
    password: string,
}