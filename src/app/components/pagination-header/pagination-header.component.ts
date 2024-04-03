import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-header',
  templateUrl: './pagination-header.component.html'
})
export class PaginationHeaderComponent implements OnInit {

  @Input() recordsByPage: number; // Ex. 2
  @Input() recordsTotal: number;  // Ex. 100
  @Input() actualPage: number;    // Ex. 5

  constructor() { }

  ngOnInit() {
  }

}
