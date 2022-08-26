import { ClientType } from "../client-type";

export interface ClientData {
    exp?: string;
    id: string;
    role: ClientType;
    name: string;
}