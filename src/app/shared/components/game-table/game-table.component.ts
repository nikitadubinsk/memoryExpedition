import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/app.component';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent implements OnInit {

  @Input() questions;
  isShowFullQuestion = false;
  @Output() onShowFullQuestion: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
  }

  openFullQuestion(id) {
    let index = this.questions.findIndex(el => el.id === id);
    if (!this.questions[index].isOpen) {
      this.questions[index].isOpen = true;
      this.onShowFullQuestion.emit({
        flag: true,
        index: index
      });
    }
  }

}
