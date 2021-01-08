import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public error$: Subject<string> = new Subject<string>();

  constructor(private adminServices: AdminService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  async authorization() {
    try {
      let ans = await this.adminServices.authorization(this.form.value);
      console.log(ans);
      this.form.reset();
      this.router.navigate(['/admin'])
    } catch (e) {
      this.error$.next(e.error.message)
    }
  }

}
