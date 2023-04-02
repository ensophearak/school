import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { MaterialModule } from './ng-material/material.module';
import { MobxAngularModule } from 'mobx-angular';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpringboardComponent } from './components/springboard/springboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { AlreadyLoginComponent } from './components/already-login/already-login.component';
import { AvatarComponent, HeaderComponent } from './components/header/header.component';
import { SchoolConfigLayoutComponent } from './layouts/school-config-layout/school-config-layout.component';
import { LottieModule } from 'ngx-lottie';
import { NotExistSchoolComponent } from './components/not-exist-school/not-exist-school.component';
import { NewSchoolFormComponent } from './components/new-school-form/new-school-form.component';
import { PageNotAvailableComponent } from './components/page-not-available/page-not-available.component';
import { DeleteComponent } from './components/delete/delete.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { collectionDocPipe, subCollectionDocPipe, validSchoolPipe } from './pipes/customs.pipe';
import { SchoolDisabledComponent } from './components/school-disabled/school-disabled.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  MobxAngularModule,
  HttpClientModule,
  LottieModule,
  NgxSkeletonLoaderModule,
];
const components = [
  HomeLayoutComponent,
  DashboardLayoutComponent,
  AuthLayoutComponent,
  SpringboardComponent,
  DashboardHeaderComponent,
  DashboardSidebarComponent,
  PageHeaderComponent,
  LoaderComponent,
  AlreadyLoginComponent,
  AvatarComponent,
  HeaderComponent,
  SchoolConfigLayoutComponent,
  NotExistSchoolComponent,
  NewSchoolFormComponent,
  PageNotAvailableComponent,
  DeleteComponent,
  NoDataComponent,
  SchoolDisabledComponent,
  validSchoolPipe,
  subCollectionDocPipe,
  collectionDocPipe,
  PageNotFoundComponent,
];
@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class AppSharedModule {}
