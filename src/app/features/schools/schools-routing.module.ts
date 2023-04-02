import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingComponent } from './pages/building/building.component';
import { CampusDetailComponent } from './pages/campus-detail/campus-detail.component';
import { DepartmentsDetailComponent } from './pages/departments-detail/departments-detail.component';
import { RoomComponent } from './pages/room/room.component';
import { SchoolDetailPanelComponent } from './pages/school-detail-panel/school-detail-panel.component';
import { SchoolsComponent } from './pages/schools/schools.component';
const routes: Routes = [

    {
        path: 'listings', children: [
            { path: "", redirectTo: "active", pathMatch: "full" },
            { path: ':status', component: SchoolsComponent },
            {
                path: 'detail/:schoolKey', component: SchoolDetailPanelComponent, children: [

                    { path: "", redirectTo: "campus", pathMatch: "full" },
                    {
                        path: 'campus', data: { pageName: "campus" }, children: [
                            {
                                path: ':key', component: CampusDetailComponent,
                                children: [
                                    {
                                        path: 'building/:key', component: BuildingComponent,
                                        children: [
                                            { path: 'room/:key', component: RoomComponent },
                                        ]
                                    },
                                ]

                            },
                        ]
                    },

                    {
                        path: 'departments', data: { pageName: "departments" }, children: [
                            { path: ':key', component: DepartmentsDetailComponent },
                        ]
                    },

                ]
            },


        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SchoolsRoutingModule { }
