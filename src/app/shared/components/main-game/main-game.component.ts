import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/app.component';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss'],
  animations: [
    trigger('popup', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.2)' }),
        animate(100)
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(250, style({
          opacity: 0,
          transform: 'scale(1.2)'
        }))
      ]),
    ])
  ]
})
export class MainGameComponent implements OnInit {

  loading = false;
  questions;
  isShowFullQuestion = false;
  question: Question;
  points = 0;
  countOfQuestion = 0;
  isShowPopapFinishGame = false;

  constructor(private questionServices: QuestionService, private router: Router) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.questions = await this.questionServices.allQuestions();
      this.questions.sort((a, b) => {
        if (a.cost > b.cost) {return 1}
        if (a.cost < b.cost) {return -1}
        return 0;
      })
    } catch (e) {
      this.router.navigate(['/error']);
    }
    this.loading = false;
  }

  showFullQuestion(obj) {
    this.isShowFullQuestion = obj.flag;
    this.question = this.questions[obj.index];
    this.countOfQuestion++;
  }

  showPopupWithFinishGame() {
    this.isShowPopapFinishGame = true;
  }

  closePopupWithFinishGame() {
    this.isShowPopapFinishGame = false;
  }

  async closeFullQuestion(obj) {
    this.isShowFullQuestion = obj.flag;
    this.points += obj.points;
    if (this.countOfQuestion == 30) {
      this.finishGame();
    }
  }

  async finishGame() {
    try {
      if (localStorage['name'] && localStorage['link']) {
        this.router.navigate(['/error']);
      }
      await this.questionServices.newPlayer({
        name: localStorage['name'],
        link: localStorage['link'],
        points: this.points
      });
    } catch(e) {
      console.log(e.message)
    }
    localStorage.clear();
    localStorage['points'] = this.points;
    this.router.navigate(['/finish']);
  }

}
