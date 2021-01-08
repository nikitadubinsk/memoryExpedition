import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  animations: [
    slideInAnimation,
    trigger('popup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.3)' }),
        animate(200)
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1.3)' }),
      ])
    ]),
  ]
})
export class AdminViewComponent implements OnInit {

  isShowPopupWithRegistrationUser = false;

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  constructor() { }

  ngOnInit() {
  }

  showPopupWithRegistrationUser(flag) {
    this.isShowPopupWithRegistrationUser = flag;
  }

}
