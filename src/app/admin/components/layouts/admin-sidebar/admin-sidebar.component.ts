import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
    @Input() toggleStatus = false;
    @Output() newStatus = new EventEmitter<boolean>();

    sidebarClose() {
        this.toggleStatus = !this.toggleStatus
        this.newStatus.emit(this.toggleStatus)
    }
}
