import { TimeAgo } from '@App/shared/time-ago.service';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'user-activity',
    templateUrl: './activity-booking.component.html',
    styleUrls: ['./activity-booking.component.scss']
})
export class ActivityBookingComponent {

    @Input() activityData

    constructor(public tiago: TimeAgo) { }


    isUser(user_name: string): boolean {
        let data = JSON.parse(localStorage.getItem('user')).displayName
        let returnedData: boolean = false
        if (data === user_name) { returnedData = true } else { returnedData = false }

        return returnedData;
    }

}
