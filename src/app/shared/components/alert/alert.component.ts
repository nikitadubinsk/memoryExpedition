import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alert', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.3)' }),
        animate(200)
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {

  title = 'Пример алерта';

  constructor() { }

  ngOnInit() {
  }

}
