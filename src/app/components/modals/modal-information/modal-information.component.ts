import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-information',
  templateUrl: './modal-information.component.html'
})
export class ModalInformationComponent implements OnInit {

  @Input() titulo: string;
  @Input() texto: string;
  @Input() information: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
