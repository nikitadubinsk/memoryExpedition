import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { FinishGameComponent } from './shared/components/finish-game/finish-game.component';
import { MainGameComponent } from './shared/components/main-game/main-game.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { GameGuard } from './shared/guards/game.guard';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {
    path: 'game', component: MainGameComponent, data: { animation: 'MainGamePage', canActivate: [GameGuard] }
  },
  { path: 'finish', component: FinishGameComponent, data: { animation: 'FinishGamePage' } },
  {path: 'error', component: ErrorPageComponent, data: {animation: 'ErrorPage'}},
  { path: 'notFound', component: NotFoundComponent },
  {path: 'admin', loadChildren: './shared/modules/admin/admin.module#AdminModule'},
  { path: "**", redirectTo: "/notFound" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
