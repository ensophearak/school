import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { CompanyComponent } from './pages/company/company.component';
const routes: Routes = [
    { path: "", redirectTo: "active", pathMatch: "full" },
    { path: ':status', component: CompanyComponent,children:[
        {
             path: ':key', component: CompanyDetailComponent
        }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompanyRoutingModule { }
