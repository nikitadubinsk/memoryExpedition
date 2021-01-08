import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  authorization(user: User) {
    return this.http.post(`http://localhost:3000/api/auth`, user).toPromise()
  }

  newUser(user: User) {
    return this.http.post(`http://localhost:3000/api/newuser`, user).toPromise()
  }

  allPlayers() {
    return this.http.get(`http://localhost:3000/api/players`).toPromise()
  }
}
