import { NgModule } from '@angular/core';
import { LoginComponent } from '../../components/admin/login/login.component';
import { RouterModule } from '@angular/router';
import { AdminViewComponent } from '../../components/admin/admin-view/admin-view.component';
import { UsersComponent } from '../../components/admin/users/users.component';
import { NewQuestionComponent } from '../../components/admin/new-question/new-question.component';
import { TopBarComponent } from '../../components/admin/top-bar/top-bar.component';
import { PopupNewUserComponent } from '../../components/admin/popup-new-user/popup-new-user.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { FindPlayersPipe } from '../../pipes/players.pipe';
import { RefDirective } from '../../directives/ref.directive';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from '../../components/admin/statistics/statistics.component';
import { AllPlayersComponent } from '../../components/admin/chart/all-players/all-players.component';
import { PointsComponent } from '../../components/admin/chart/points/points.component';
import { AngularFileUploaderModule } from "angular-file-uploader";


@NgModule({
  declarations: [
    LoginComponent,
    TopBarComponent,
    AdminViewComponent,
    UsersComponent,
    NewQuestionComponent,
    PopupNewUserComponent,
    AlertComponent,
    FindPlayersPipe,
    RefDirective,
    StatisticsComponent,
    AllPlayersComponent,
    PointsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularFileUploaderModule,
    RouterModule.forChild([
      {path: "login", component: LoginComponent},
      {
        path: "", component: AdminViewComponent, children: [
          { path: "", component: UsersComponent, data: {animation: 'UsersPage'} },
          { path: "newquestion", component: NewQuestionComponent, data: { animation: 'NewQuestionPage' } },
          { path: "statistics", component: StatisticsComponent, data: {animation: 'StatisticsPage'} }
        ]
      }
    ])
  ],
  entryComponents: [AlertComponent],
})
export class AdminModule { }
