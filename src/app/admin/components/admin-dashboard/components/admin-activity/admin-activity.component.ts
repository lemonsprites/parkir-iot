import { TimeAgo } from './../../../../../shared/time-ago.service';
import { Observable } from 'rxjs';
import { ActivityService } from '@App/shared/services/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-activity',
    templateUrl: './admin-activity.component.html',
    styleUrls: ['./admin-activity.component.scss']
})
export class AdminActivityComponent implements OnInit {
    // activities$: Observable<any[]>;
    activities: any = this.activityService.getAllActivitiesAllUser();

    constructor(private activityService: ActivityService, private time: TimeAgo) { }

    ngOnInit() {
        this.activityService.getAllActivitiesAllUser().subscribe(activities => {
            console.log(activities)
            this.activities = activities;
        });
    }

    getActivityTime(timestamp: string): string {
        // Implement your logic to calculate and format time difference (e.g., 32 min)
        return this.time.timeAgo(new Date(timestamp).getTime());
    }

    getActivityBadgeClass(status: string): string {
        return status === 'booked' ? 'bi-circle-fill text-primary' : 'bi-circle-fill text-danger';
    }

    getActivityStatusText(status: string): string {
        return status === 'booked' ? 'booked a parking space.' : 'cancelled a booking.';
    }
}
