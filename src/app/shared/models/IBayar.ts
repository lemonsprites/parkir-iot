import { IResi } from './IResi';

export interface IBayar {
    user: string;
    booking: string;
    amount: number;
    timestamp: string;
    status: string;
    paymentMethod: string;
    resi: IResi;
}
