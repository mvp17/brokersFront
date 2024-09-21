import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'modal-boots',
    standalone: true,
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	imports: [CommonModule, NgbModule, FormsModule]
})
export class ModalComponent {
	@Input() body: string;

	constructor(public activeModal: NgbActiveModal) {
		this.body = '';
	}
}
