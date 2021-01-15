import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface User {
  id?: number
  email: string,
  password: string,
  createdAt?: string,
  updatedAt?: string
}

export interface Player {
  id?: number
  name: string,
  link: string,
  points?: number,
  createdAt?: string,
  updatedAt?: string
}

export interface Question {
  id?: number
  text: string,
  answer1: string,
  answer2: string,
  answer3: string,
  correctAnswer: string,
  cost: number,
  category: string,
  picture?: string,
  URLVideo?: string,
  createdAt?: string,
  updatedAt?: string,
  isOpen?: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Экспедиция памяти';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
