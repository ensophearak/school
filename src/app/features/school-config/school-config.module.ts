import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolProfileComponent } from './pages/school-profile/school-profile.component';
import { AppSharedModule } from 'src/app/shared';
import { SchoolConfigRoutingModule } from './school-config-routing.module';
import { SchoolProfileOverviewComponent } from './pages/school-profile-overview/school-profile-overview.component';
import { SchoolCampusComponent } from './pages/school-campus/school-campus.component';
import { buildingStore, campusStore, roomStore } from '../schools';
import { SchoolCampusDetailComponent } from './pages/school-campus-detail/school-campus-detail.component';
import { SchoolBuildingComponent } from './pages/school-building/school-building.component';

@NgModule({
  declarations: [
    SchoolProfileComponent,
    SchoolProfileOverviewComponent,
    SchoolCampusComponent,
    SchoolCampusDetailComponent,
    SchoolBuildingComponent,
  ],
  imports: [
    CommonModule,
    SchoolConfigRoutingModule,
    AppSharedModule,
  ],
  providers:[
    campusStore,
    buildingStore,
    roomStore
  ]
})
export class SchoolConfigModule { }
