import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScholarshipPanelComponent } from './pages/scholarship-panel/scholarship-panel.component';
const routes: Routes = [
    { path: "", redirectTo: "overview", pathMatch: "full" },
    {
        path: 'overview', component: ScholarshipPanelComponent
    }
    // { path: ':status', component: CompanyComponent,children:[
    //     {
    //          path: ':key', component: CompanyDetailComponent
    //     }
    // ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScholarshipRoutingModule { }
