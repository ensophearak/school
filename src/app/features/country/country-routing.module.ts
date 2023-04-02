import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { CountryComponent } from './pages/country/country.component';
const routes: Routes = [
    { path: "", redirectTo: "active", pathMatch: "full" },
    { path: ':status', component: CountryComponent,children:[
        {
             path: ':key', component: CountryDetailComponent
        }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CountryRoutingModule { }
