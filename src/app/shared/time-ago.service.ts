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
            return `${minutes} ${minutes === 1 ? 'Menit' : 'Menit'} yang lalu`;
        } else if (timeDifference < 86400000) {
            const hours = Math.floor(timeDifference / 3600000);
            return `${hours} ${hours === 1 ? 'Jam' : 'Jam'} <br> yang lalu.`;
        } else if (timeDifference < 604800000) {
            const days = Math.floor(timeDifference / 86400000);
            return `${days} ${days === 1 ? 'Hari' : 'Hari'} <br> yang lalu.`;
        } else {
            const date = new Date(timestamp);
            console.log(timestamp, date)
            return date.toDateString();
        }
    }

    timeAgoShort(timestamp: number) {
        let timeDifference = this.currentTime - timestamp;
        if (timeDifference < 60000) {
            return 'Baru saja';
        } else if (timeDifference < 3600000) {
            const minutes = Math.floor(timeDifference / 60000);
            return `${minutes} ${minutes === 1 ? 'Min' : 'Min'}`;
        } else if (timeDifference < 86400000) {
            const hours = Math.floor(timeDifference / 3600000);
            return `${hours} ${hours === 1 ? 'Jam' : 'Jam'}`;
        } else if (timeDifference < 604800000) {
            const days = Math.floor(timeDifference / 86400000);
            return `${days} ${days === 1 ? 'Hari' : 'Hari'}`;
        } else {
            const date = new Date(timestamp);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        }
    }
}