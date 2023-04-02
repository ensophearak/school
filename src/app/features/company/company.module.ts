import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './pages/company/company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { AppSharedModule } from 'src/app/shared';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { CompanyFormComponent } from './pages/company-form/company-form.component';
import { companyStore } from './stores/company.store';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyDetailComponent,
    CompanyFormComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    CompanyRoutingModule
  ],
  providers:[
    companyStore
  ]
})
export class CompanyModule { }
