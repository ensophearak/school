import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from '../stores/auth.store';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(
    public auth: AuthStore,
    public router: Router,
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn !== true) {
      this.router.navigate(['auth'])
    }
    return true;
  }


}