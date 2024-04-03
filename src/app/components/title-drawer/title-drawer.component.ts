import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title-drawer',
  templateUrl: './title-drawer.component.html',
  styleUrls: ['./title-drawer.component.css']
})
export class TitleDrawerComponent implements OnInit {

  @Input() image: string;
  @Input() title: string;

  // Acción que se ejecutará al dar click el boton de draw
  @Output() drawer: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


}
