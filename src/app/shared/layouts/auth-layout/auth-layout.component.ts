import { Component, OnInit } from '@angular/core';
// import { AuthStore } from 'src/app/core';

@Component({
  // selector: 'auth',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(
    // private auth: AuthStore,
  ) { 
    // this.auth.fetchCanActive()
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    // this.auth.userSubscription.unsubscribe();
  }

}
