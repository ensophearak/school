import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPanelComponent } from './pages/dashboard-panel/dashboard-panel.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppSharedModule } from 'src/app/shared';
@NgModule({
  declarations: [DashboardPanelComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppSharedModule,
  ]
})
export class DashboardModule { }
