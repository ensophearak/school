import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassManagerPanelComponent } from './pages/class-manager-panel/class-manager-panel.component';
const routes: Routes = [
    { path: "", redirectTo: "overview", pathMatch: "full" },
    {
        path: 'overview', component: ClassManagerPanelComponent
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
export class ClassManagerRoutingModule { }
