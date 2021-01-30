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
  @Output() onOpenPopup: EventEmitter<Object> = new EventEmitter<Object>()
  isError = false;

  constructor(private adminServices: AdminService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async registration() {
    if (Object.values(this.form.value).every(el => el.toString().trim())) {
      try {
        this.isError = false;
        await this.adminServices.newUser(this.form.value);
        this.form.reset();
        this.onOpenPopup.emit({flag: false, action: 'new'});
      } catch (e) {
        // this.onOpenPopup.emit({flag: false, action: 'error'});
        this.error$.next(e.error.message)
      }
    } else {
      this.isError = true;
    }
  }

  cansel() {
    this.onOpenPopup.emit({flag: false, action: 'cansel'});
  }

}
