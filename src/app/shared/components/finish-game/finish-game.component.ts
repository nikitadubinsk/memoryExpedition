import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit {

  points = 0;

  constructor() { }

  ngOnInit() {
    this.points = localStorage['points'];
    localStorage.clear();
  }

}
