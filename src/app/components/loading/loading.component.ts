import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  @Input() loading = false;
  @Input() fullScreen = true;

  constructor() { }

  ngOnInit() {
  }

}
