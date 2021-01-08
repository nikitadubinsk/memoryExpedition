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
import { CategoryPipe } from './shared/pipes/category.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MainGameComponent,
    OneQuestionComponent,
    NotFoundComponent,
    FinishGameComponent,
    GameTableComponent,
    CategoryPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
