import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FinishGameComponent } from './shared/components/finish-game/finish-game.component';
import { GameTableComponent } from './shared/components/game-table/game-table.component';
import { MainGameComponent } from './shared/components/main-game/main-game.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { OneQuestionComponent } from './shared/components/one-question/one-question.component';


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {
    path: 'game', component: MainGameComponent, data: { animation: 'MainGamePage' }, children: [
      { path: '', component: GameTableComponent, data: { animation: 'GameTablePage' } },
      {path: 'question', component: OneQuestionComponent, data: {animation: 'OneQuestionPage'}}
  ] },
  {path: 'finish', component: FinishGameComponent, data: {animation: 'FinishGamePage'}},
  {path: 'error', component: NotFoundComponent},
  // { path: "**", redirectTo: "/error" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
