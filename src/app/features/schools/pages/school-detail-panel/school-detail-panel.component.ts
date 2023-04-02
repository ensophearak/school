import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthStore, Tabs } from 'src/app/core';
import { mapRouteWithSchoolKeyAndItemKey } from 'src/app/shared';
import { schoolsStore } from '../../stores/schools.store';
import { CampusComponent } from '../campus/campus.component';
import { DepartmentsComponent } from '../departments/departments.component';

@Component({
  selector: 'app-school-detail-panel',
  templateUrl: './school-detail-panel.component.html',
  styleUrls: ['./school-detail-panel.component.scss']
})
export class SchoolDetailPanelComponent {
  tabs = [];
  public currentPage: Portal<any>;

  constructor(
    private auth: AuthStore,
    private activatedRoute: ActivatedRoute,
    public store: schoolsStore,

  ) { }
  async ngOnInit(): Promise<void> {
    const { schoolKey } = this.auth;
    const params: any = this.activatedRoute.snapshot.params;
    const path: any = this.activatedRoute.firstChild.snapshot.data['pageName'];
    this.tabs = mapRouteWithSchoolKeyAndItemKey(Tabs.schoolPanelTabs, schoolKey, params?.schoolKey);
    this.loadCurrentPage(path);
    if (!params?.schoolKey) {
      return
    }
    await this.store.fetchSelectedData(params?.schoolKey);
  }

  routeClick(path: string) {
    this.loadCurrentPage(path)
  }

  loadCurrentPage(path: string) {
    if (path === 'campus') {
      this.currentPage = new ComponentPortal(CampusComponent);
    } else {
      this.currentPage = new ComponentPortal(DepartmentsComponent);
    }
  }
}
