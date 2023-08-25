import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-area-add',
  templateUrl: './area-add.component.html',
  standalone: true,
  styleUrls: ['./area-add.component.scss']
})
export class AreaAddComponent {
    @Input() name;

	constructor(public activeModal: NgbActiveModal) {}
}