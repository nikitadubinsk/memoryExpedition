import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-minialert',
  templateUrl: './minialert.component.html',
  styleUrls: ['./minialert.component.scss']
})
export class MinialertComponent {

  @Input() text;

  constructor() { }

}
