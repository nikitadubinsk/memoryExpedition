import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question, Player } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  allQuestions() {
    return this.http.get(`${environment.urlApi}/questions`).toPromise()
  }

  correctAnswer(id) {
    return this.http.get(`${environment.urlApi}/correct/${id}`).pipe(delay(1500)).toPromise();
  }

  createQuestion(question: Question) {
    return this.http.post<Question[]>(`${environment.urlApi}/newquestion`, question).toPromise()
  }

  deleteQuestion(id) {
    return this.http.delete(`${environment.urlApi}/deletequestion/${id}`).toPromise()
  }

  newPlayer(player: Player) {
    return this.http.post<Player>(`${environment.urlApi}/newplayer`, player).toPromise()
  }

  allAdminQuestions() {
    return this.http.get(`${environment.urlApi}/admin/questions`).toPromise()
  }

  categories() {
    return this.http.get(`${environment.urlApi}/categories`).toPromise()
  }
}
