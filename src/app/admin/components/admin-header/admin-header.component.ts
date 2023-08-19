import { Component } from '@angular/core';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
    sidebarToggle: boolean = false

    togglingSidebar() {
        this.sidebarToggle = !this.sidebarToggle;
        console.log(this.sidebarToggle)
    }

}
