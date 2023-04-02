import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthStore, SchoolConfigMenu } from 'src/app/core';
import { mapRouteWithSchoolKey } from '../../services/mapping.service';

@Component({
  // selector: 'app-school-config-layout',
  templateUrl: './school-config-layout.component.html',
  styleUrls: ['./school-config-layout.component.scss']
})
export class SchoolConfigLayoutComponent {
  userSubscription$: Subscription;
  userDataSubscription$: Subscription;
  SchoolConfigMenu: any[] = [];
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
      this.SchoolConfigMenu = mapRouteWithSchoolKey(SchoolConfigMenu, schoolKey);
      await this.auth.fetchUserProfile(this.auth.user, schoolKey);
    }
  }
  ngOnDestroy(): void {
  }
}
