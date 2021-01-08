import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question, Player } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  allQuestions() {
    return this.http.get(`http://localhost:3000/api/questions`).toPromise()
  }

  createQuestion(question: Question) {
    return this.http.post<Question[]>(`http://localhost:3000/api/newquestion`, question).toPromise()
  }

  newPlayer(player: Player) {
    return this.http.post<Player>(`http://localhost:3000/api/newplayer`, player).toPromise()
  }
}
