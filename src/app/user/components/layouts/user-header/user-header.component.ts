import { Component } from '@angular/core';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
    sidebarToggle: boolean = false

    togglingSidebar() {
        this.sidebarToggle = !this.sidebarToggle;
        console.log(this.sidebarToggle)
    }

    newStatus(set : boolean) {
        this.sidebarToggle = set;
    }

}
