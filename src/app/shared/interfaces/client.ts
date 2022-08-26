import { ClientType } from './../client-type';

export interface Client {
    email: string
    password: string
    clientType: ClientType
}