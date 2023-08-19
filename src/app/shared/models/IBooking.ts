import { IBayar } from './IBayar';

export interface IBooking {
    user: string;
    parkingLot: string;
    startTime: string;
    endTime: string;
    status: string;
    pembayaran: IBayar;
}
