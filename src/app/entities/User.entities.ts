import { Advertisement } from "./advertisement.entities";

export class User{
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    roleId: number;
    advertisementId: number;
    status: boolean;
    securityCode: string;
    advertisement : Advertisement
}