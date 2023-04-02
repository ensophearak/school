import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from 'src/app/shared';
import { HrRoutingModule } from './hr-routing.module';
import { HrPanelComponent } from './pages/hr-panel/hr-panel.component';

@NgModule({
  declarations: [
    HrPanelComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    HrRoutingModule
  ]
})
export class HrModule { }
