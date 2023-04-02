import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsComponent } from './pages/schools/schools.component';
import { AppSharedModule } from 'src/app/shared';
import { SchoolsRoutingModule } from './schools-routing.module';
import { CampusComponent } from './pages/campus/campus.component';
import { BuildingComponent } from './pages/building/building.component';
import { RoomComponent } from './pages/room/room.component';
import { schoolsStore } from './stores/schools.store';
import { SchoolFormComponent } from './pages/school-form/school-form.component';
import { RoomFormComponent } from './pages/room-form/room-form.component';
import { BuildingFormComponent } from './pages/building-form/building-form.component';
import { CampusFormComponent } from './pages/campus-form/campus-form.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { DepartmentsFormComponent } from './pages/departments-form/departments-form.component';
import { SchoolDetailPanelComponent } from './pages/school-detail-panel/school-detail-panel.component';
import { DepartmentsDetailComponent } from './pages/departments-detail/departments-detail.component';
import { CampusDetailComponent } from './pages/campus-detail/campus-detail.component';
import { campusStore } from './stores/campus.store';
import { buildingStore } from './stores/building.store';
import { roomStore } from './stores/room.store';
import { departmentStore } from './stores/department.store';



@NgModule({
  declarations: [
    SchoolsComponent,
    CampusComponent,
    BuildingComponent,
    RoomComponent,
    SchoolFormComponent,
    RoomFormComponent,
    BuildingFormComponent,
    CampusFormComponent,
    DepartmentsComponent,
    DepartmentsFormComponent,
    SchoolDetailPanelComponent,
    DepartmentsDetailComponent,
    CampusDetailComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    SchoolsRoutingModule
  ],
  providers:[
    schoolsStore,
    campusStore,
    buildingStore,
    roomStore,
    departmentStore
  ]
})
export class SchoolsModule { }
