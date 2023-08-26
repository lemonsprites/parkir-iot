import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OtpProviderService {

    constructor() {
    }

    generateOTP(): string {
        var digits = '0123456789';
        let ID = '';
        for (let i = 0; i < 6; i++) {
            ID += digits[Math.floor(Math.random() * 10)];
        }
        return ID;
    }

}
