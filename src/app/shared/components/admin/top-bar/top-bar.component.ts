import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  animations: [
    trigger('menu', [
      transition(':enter', [
        style({ opacity: 0, height: '0vw' }),
        animate(500, style({
          height: '100%',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '100%', }),
        animate(250, style({
          opacity: 0,
          height: '0vw'
        }))
      ]),
    ])
  ]
})
export class TopBarComponent implements OnInit {

  @Output() onShowPopupWithRegistrationUser: EventEmitter<Object> = new EventEmitter<Object>();
  isShowMenu = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/'])
  }

  openMenu() {
    this.isShowMenu = true;
  }

  closeMenu() {
    this.isShowMenu = false;
  }

  newUser() {
    this.onShowPopupWithRegistrationUser.emit({flag: true});
  }

}
