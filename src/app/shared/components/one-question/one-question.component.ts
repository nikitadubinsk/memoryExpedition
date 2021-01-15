import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/app.component';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-one-question',
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.scss'],
  animations: [
    trigger('continueButton', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000)
      ])
    ]),
  ]
})
export class OneQuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() onCloseFullQuestion:EventEmitter<Object> = new EventEmitter<Object>();
  wasClick = false;
  chooseAnAnswerFlag = [];
  answerTrueFlag = [];
  answerFalseFlag = [];
  points = 0;
  isShowContinueButton = false;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.question.picture) {
      this.question.picture = environment.urlPicture + this.question.picture;
    }
    for (let i=1; i<=4; i++) {
      this.chooseAnAnswerFlag[i] = false;
      this.answerTrueFlag[i] = false;
      this.answerFalseFlag[i] = false;
    }
  }

  VideoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.question.URLVideo);
  }

  chooseAnAnswer(ans) {
    if (!this.wasClick) {
      this.wasClick = true;
      this.chooseAnAnswerFlag[ans] = true;
      setTimeout(() => {
        if (ans == this.question.correctAnswer) {
          this.chooseAnAnswerFlag[ans] = false;
          this.answerTrueFlag[ans] = true;
          this.points = this.question.cost;
        } else {
          this.answerTrueFlag[this.question.correctAnswer] = true;
          this.answerFalseFlag[ans] = true;
          this.chooseAnAnswerFlag[ans] = false;
        }
        this.isShowContinueButton = true;
      }, 1500)
    }
  }

  continue() {
    this.onCloseFullQuestion.emit({
      points: this.points,
      flag: false
    })
  }

}
