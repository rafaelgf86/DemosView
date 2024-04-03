import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LateralMenu } from '../../interfaces/list';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() lateralMenu: LateralMenu;

  constructor() { }

  ngOnInit(): void {
  }

}
