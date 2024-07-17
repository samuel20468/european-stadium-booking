export enum Stadium {
    MADRID = "Santiago Bernabéu", 
    INGLATERRA = "Anfield",
    FRANCIA = "Parc des Princes",
    ALEMANIA = "Alianz Arena"
}


export type Status = "Active" | "Cancelled" | "Closed";
export type HourMinute = `${'0' | '1' | '2'}${string}:${string}${string}`;