import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassManagerPanelComponent } from './pages/class-manager-panel/class-manager-panel.component';
import { AppSharedModule } from 'src/app/shared';
import { ClassManagerRoutingModule } from './class-manager-routing.module';



@NgModule({
  declarations: [
    ClassManagerPanelComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    ClassManagerRoutingModule
  ]
})
export class ClassManagerModule { }
