import { Component } from '@angular/core';
import { AuthStore, Tabs } from 'src/app/core';
import { mapRouteWithSchoolKey } from 'src/app/shared';

@Component({
  selector: 'app-school-profile',
  templateUrl: './school-profile.component.html',
  styleUrls: ['./school-profile.component.scss']
})
export class SchoolProfileComponent {
  tabs = [];
  constructor(
    public auth: AuthStore,
  ) { }
  ngOnInit(): void {
    const { schoolKey } = this.auth;
    this.tabs = mapRouteWithSchoolKey(Tabs.schoolProfileTabs, schoolKey);
  }

}
