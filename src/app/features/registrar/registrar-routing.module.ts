import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarPanelComponent } from './pages/registrar-panel/registrar-panel.component';
const routes: Routes = [
    { path: "", redirectTo: "overview", pathMatch: "full" },
    {
        path: 'overview', component: RegistrarPanelComponent
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
export class RegistrarRoutingModule { }
