import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question, Player } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  allQuestions() {
    return this.http.get(`${environment.urlApi}/questions`).toPromise()
  }

  createQuestion(question: Question) {
    return this.http.post<Question[]>(`${environment.urlApi}/newquestion`, question).toPromise()
  }

  newPlayer(player: Player) {
    return this.http.post<Player>(`${environment.urlApi}/newplayer`, player).toPromise()
  }
}
