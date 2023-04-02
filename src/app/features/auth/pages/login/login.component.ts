import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore, Translate } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  hide: boolean = true;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthStore,
    public tran: Translate,

  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }


  ngOnInit() {
  }
  onSingIn(f: { email: any; password: any; }) {
    if (this.form.valid) {
      const { email, password } = f
      this.auth.signIn(email, password, (success: any, result: { message: string; }) => {
        if (success) {
          console.info('You have successfully login!')
        } else {
          this.errorMessage = result.message
        }
      })
    }
  }

  onGoogleAuth() {
    this.auth.googleAuth((success: any, result: any) => {
      if (success) {
        console.info('You have successfully login!')
      }
    })
  }
  ngOnDestroy(): void {
  }


}
