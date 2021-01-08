import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/admin/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminViewComponent } from '../../components/admin/admin-view/admin-view.component';
import { UsersComponent } from '../../components/admin/users/users.component';
import { NewQuestionComponent } from '../../components/admin/new-question/new-question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from '../../components/admin/top-bar/top-bar.component';
import { PopupNewUserComponent } from '../../components/admin/popup-new-user/popup-new-user.component';



@NgModule({
  declarations: [
    LoginComponent,
    TopBarComponent,
    AdminViewComponent,
    UsersComponent,
    NewQuestionComponent,
    PopupNewUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: "login", component: LoginComponent},
      {
        path: "admin", component: AdminViewComponent, children: [
          { path: "", component: UsersComponent, data: {animation: 'UsersPage'} },
          { path: "newquestion", component: NewQuestionComponent, data: {animation: 'NewQuestionPage'} }
        ]
      }
    ])
  ]
})
export class AdminModule { }
