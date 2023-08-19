import { Component } from '@angular/core';
import { FirebaseApps } from '@angular/fire/app';
import { Database, DatabaseInstances, list, object, onValue, ref, set } from '@angular/fire/database';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'parkir-iot';

    Area: any;
    constructor(private db: Database) {}
}
