import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  authorization(user: User) {
    return this.http.post(`${environment.urlApi}/auth`, user).toPromise()
  }

  newUser(user: User) {
    return this.http.post(`${environment.urlApi}/newuser`, user).toPromise()
  }

  allPlayers() {
    return this.http.get(`${environment.urlApi}/players`).toPromise()
  }

  deletePlayer(id) {
    return this.http.delete(`${environment.urlApi}/deleteplayer/${id}`).toPromise()
  }

  statistics() {
    return this.http.get(`${environment.urlApi}/statistics`).toPromise()
  }

  newCategory(category) {
    return this.http.post(`${environment.urlApi}/newcategory`, category).toPromise()
  }

  editCategory(category) {
    return this.http.put(`${environment.urlApi}/edit/category`, category).toPromise()
  }

  settings() {
    return this.http.get(`${environment.urlApi}/settings`).toPromise()
  }

  newSetting(setting) {
    return this.http.post(`${environment.urlApi}/newsetting`, setting).toPromise()
  }

  deleteQuestions() {
    return this.http.delete(`${environment.urlApi}/deletequestions`).toPromise()
  }

  admincategories() {
    return this.http.get(`${environment.urlApi}/admincategories`).toPromise()
  }
}
