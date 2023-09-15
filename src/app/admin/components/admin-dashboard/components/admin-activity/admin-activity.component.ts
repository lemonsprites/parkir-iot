import { ActivityService } from '@App/shared/services/activity.service';
import { Component, OnInit } from '@angular/core';
import { TimeAgo } from './../../../../../shared/time-ago.service';

@Component({
    selector: 'admin-activity',
    templateUrl: './admin-activity.component.html',
    styleUrls: ['./admin-activity.component.scss']
})
export class AdminActivityComponent implements OnInit {
    // activities$: Observable<any[]>;
    activities: any[] = [];

    constructor(private activityService: ActivityService, private time: TimeAgo) { }

    ngOnInit() {
        this.activityService.getAllActivitiesAllUser().subscribe(activities => {
            console.log(activities)
            this.activities = activities;
        });
    }

    getActivityTime(timestamp: string): string {
        return this.time.timeAgoShort(parseInt(timestamp))
    }

    getActivityBadgeClass(status: string): string {
        return status === 'booked' ? 'bi-circle-fill text-primary' : 'bi-circle-fill text-danger';
    }

    getActivityStatusText(status: string): string {
        return status === 'booked' ? 'booked a parking space.' : 'cancelled a booking.';
    }
}
