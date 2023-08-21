import { IArea } from '@App/shared/area.interface';
import { Component } from '@angular/core';
import { DatabaseInstances, list, ref } from '@angular/fire/database';
import { getDatabase } from '@firebase/database';

@Component({
  selector: 'user-dasboard',
  templateUrl: './user-dasboard.component.html',
  styleUrls: ['./user-dasboard.component.scss'],
})
export class UserDasboardComponent {
    jmlArea: any;
    areaList: IArea[] = [];

    constructor(private db: DatabaseInstances) {
        this.getData()
    }

    getData() {
        list(ref(this.db[0],'/area')).subscribe(snap => {
            this.jmlArea = snap.length
            let map = snap.map(x => ({key: x.snapshot.key, ...x.snapshot.val()}))
            this.areaList = map
            console.log(this.areaList);
        })

    }



}
