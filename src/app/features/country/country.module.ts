import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './pages/country/country.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { CountryFormComponent } from './pages/country-form/country-form.component';
import { AppSharedModule } from 'src/app/shared';
import { CountryRoutingModule } from './country-routing.module';



@NgModule({
  declarations: [
    CountryComponent,
    CountryDetailComponent,
    CountryFormComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    AppSharedModule
  ]
})
export class CountryModule { }
