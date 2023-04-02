import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPanelComponent } from './pages/registrar-panel/registrar-panel.component';
import { AppSharedModule } from 'src/app/shared';
import { RegistrarRoutingModule } from './registrar-routing.module';



@NgModule({
  declarations: [
    RegistrarPanelComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    RegistrarRoutingModule
  ]
})
export class RegistrarModule { }
