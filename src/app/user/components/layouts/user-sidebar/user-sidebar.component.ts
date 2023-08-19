import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent {
    @Input() toggleStatus = false;
    @Output() newStatus = new EventEmitter<boolean>();


    sidebarClose() {
        this.toggleStatus = !this.toggleStatus
        this.newStatus.emit(this.toggleStatus)
    }

    

}
