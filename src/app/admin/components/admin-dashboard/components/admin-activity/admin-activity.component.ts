import { ActivityService } from '@App/shared/services/activity.service';
import { Component, OnInit } from '@angular/core';
import { TimeAgo } from './../../../../../shared/time-ago.service';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'admin-activity',
    templateUrl: './admin-activity.component.html',
    styleUrls: ['./admin-activity.component.scss']
})
export class AdminActivityComponent implements OnInit {
    // activities$: Observable<any[]>;
    activities$: Observable<any>;

    constructor(private activityService: ActivityService, private time: TimeAgo) {
        this.activities$ = this.activityService.getAllActivitiesAllUser().pipe(
            map(
                (data) => {
                    data.sort((a: any, b: any) => b.timestamp - a.timestamp);
                    return data;
                })
        )
    }

    ngOnInit() {

    }

    getActivityTime(timestamp: string): string {

        return this.time.timeAgoShort(parseInt(timestamp))
    }


    getActivityStatusText(status: string): string {
        return status === 'booked' ? 'booked a parking space.' : 'cancelled a booking.';
    }
}
