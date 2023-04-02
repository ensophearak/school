import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from 'src/app/shared';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    HomeRoutingModule
    
  ]
})
export class HomeModule { }
