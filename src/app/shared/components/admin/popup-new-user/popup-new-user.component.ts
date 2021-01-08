import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-popup-new-user',
  templateUrl: './popup-new-user.component.html',
  styleUrls: ['./popup-new-user.component.scss']
})
export class PopupNewUserComponent implements OnInit {

  form: FormGroup;
  public error$: Subject<string> = new Subject<string>();
  isShowPopupWithRegistrationUser: false
  @Output() onOpenPopup: EventEmitter<Boolean> = new EventEmitter<Boolean>()

  constructor(private adminServices: AdminService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async registration() {
    try {
      await this.adminServices.newUser(this.form.value);
      this.form.reset();
      this.cansel();
    } catch (e) {
      console.log(e.message);
    }
  }

  cansel() {
    this.onOpenPopup.emit(false);
  }

}
