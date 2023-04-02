import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrPanelComponent } from './pages/hr-panel/hr-panel.component';
const routes: Routes = [
    { path: "", redirectTo: "overview", pathMatch: "full" },
    {
        path: 'overview', component: HrPanelComponent
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
export class HrRoutingModule { }
