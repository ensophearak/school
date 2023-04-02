import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from 'src/app/shared';
import { ScholarshipRoutingModule } from './scholarship-routing.module';
import { ScholarshipPanelComponent } from './pages/scholarship-panel/scholarship-panel.component';

@NgModule({
  declarations: [
    ScholarshipPanelComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    ScholarshipRoutingModule
  ]
})
export class ScholarshipModule { }
