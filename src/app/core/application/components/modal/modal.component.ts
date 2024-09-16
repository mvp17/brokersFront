import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'modal-boots',
    standalone: true,
	templateUrl: './modal.component.html',
})
export class ModalComponent {
	@Input() body: string;
	constructor(public activeModal: NgbActiveModal) {
		this.body = '';
	}
}
