import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { MainGameComponent } from './shared/components/main-game/main-game.component';
import { AdminModule } from './shared/modules/admin/admin.module';
import { OneQuestionComponent } from './shared/components/one-question/one-question.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FinishGameComponent } from './shared/components/finish-game/finish-game.component';
import { GameTableComponent } from './shared/components/game-table/game-table.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { SharedModule } from './shared/modules/shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MainGameComponent,
    OneQuestionComponent,
    NotFoundComponent,
    FinishGameComponent,
    GameTableComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
