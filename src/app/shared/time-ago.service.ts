import { Injectable } from '@angular/core';

@Injectable()
export class TimeAgo {

    private currentTime = Date.now();

    timeAgo(timestamp: number) {
        let timeDifference = this.currentTime - timestamp;
        if (timeDifference < 60000) {
            return 'Baru saja';
        } else if (timeDifference < 3600000) {
            const minutes = Math.floor(timeDifference / 60000);
            return `${minutes} ${minutes === 1 ? 'Menit' : 'Menit'} yang lalu.`;
        } else if (timeDifference < 86400000) {
            const hours = Math.floor(timeDifference / 3600000);
            return `${hours} ${hours === 1 ? 'Jam' : 'Jam'} yang lalu.`;
        } else if (timeDifference < 604800000) {
            const days = Math.floor(timeDifference / 86400000);
            return `${days} ${days === 1 ? 'Hari' : 'Hari'} yang lalu.`;
        } else {
            const date = new Date(timestamp);
            return date.toDateString();
        }
    }
}