import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from '../stores/auth.store';
@Injectable({
  providedIn: 'root'
})

export class SecureInnerPagesGuard {
  constructor(
    public auth: AuthStore,
    public router: Router
  ) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isLoggedIn) {
       this.router.navigate([`${this.auth.schoolKey}`])
      //  this.router.navigate([`${this.auth.schoolKey}/dashboard`])
    }
    return true;
  }

}



@Injectable({
  providedIn: 'root'
})

export class HasSchoolGuard{
  constructor(
    public auth: AuthStore,
    public router: Router
  ) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isHasSchool) {
       this.router.navigate([`${this.auth.schoolKey}`])
      //  this.router.navigate([`${this.auth.schoolKey}/dashboard`])
    }
    return true;
  }

}
