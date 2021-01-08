import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  @Output() onShowPopupWithRegistrationUser:EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/'])
  }

  newUser() {
    this.onShowPopupWithRegistrationUser.emit(true);
  }

}
