import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolCampusDetailComponent } from './pages/school-campus-detail/school-campus-detail.component';
import { SchoolCampusComponent } from './pages/school-campus/school-campus.component';
import { SchoolProfileOverviewComponent } from './pages/school-profile-overview/school-profile-overview.component';
import { SchoolProfileComponent } from './pages/school-profile/school-profile.component';
const routes: Routes = [
    {
        path: 'profile', component: SchoolProfileComponent, children: [
            { path: "", redirectTo: "overview", pathMatch: "full" },
            { path: 'overview', component: SchoolProfileOverviewComponent },
            {
                path: 'campus', component: SchoolCampusComponent, children: [
                    { path: ':id', component: SchoolCampusDetailComponent },
                ]
            }
        ],


    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SchoolConfigRoutingModule { }
