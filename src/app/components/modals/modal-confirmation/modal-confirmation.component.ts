import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() title: string;
  @Input() name: string;
  @Input() type: string;
  @Input() aditionalData: string;
  @Input() showWarning = true;
  @Input() warning: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
