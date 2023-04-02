import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthStore } from 'src/app/core';

@Component({
  // selector: 'dashboard',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  userSubscription$: Subscription;
  userDataSubscription$: Subscription;
  constructor(
    public auth: AuthStore,
    private activeRoute: ActivatedRoute,

  ) {
    this.auth.fetchCanActive()
  }

  async ngOnInit(): Promise<void> {
    if (this.auth.user) {
      console.log('this.auth.user', this.auth.user);
      const params = this.activeRoute.snapshot.params;
      const { schoolKey } = params;
      await this.auth.fetchUserProfile(this.auth.user, schoolKey);
    }
  }
  ngOnDestroy(): void {
    // this.auth.userSubscription.unsubscribe();
  }

}
