import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard, SecureInnerPagesGuard, NetworkAwarePreloadService, HasSchoolGuard } from './core';
import { SchoolGuard } from './core/guards/school.guard';
import { AuthLayoutComponent, DashboardLayoutComponent, HomeLayoutComponent, NewSchoolFormComponent, SchoolConfigLayoutComponent } from './shared';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [

  
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: 'auth',
    canActivate: [SecureInnerPagesGuard], component: AuthLayoutComponent,
    loadChildren: () => import('./features/auth').then(m => m.AuthModule)
  },
 
  { path: 'new-school', canActivate: [AuthGuard, HasSchoolGuard], component: NewSchoolFormComponent},

  {
    path: ':schoolKey', canActivate: [AuthGuard, SchoolGuard], children: [


      {
        path: '', component: HomeLayoutComponent,
        loadChildren: () => import('./features/home').then(m => m.HomeModule)
      },


      {
        path: 'dashboard', component: DashboardLayoutComponent,
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      {
        path: 'hr', component: DashboardLayoutComponent,
        loadChildren: () => import('./features/hr/hr.module').then(m => m.HrModule)
      },

      {
        path: 'scholarship', component: DashboardLayoutComponent,
        loadChildren: () => import('./features/scholarship/scholarship.module').then(m => m.ScholarshipModule)
      },
      {
        path: 'class-manager', component: DashboardLayoutComponent,
        loadChildren: () => import('./features/class-manager/class-manager.module').then(m => m.ClassManagerModule)
      },
      {
        path: 'registrar', component: DashboardLayoutComponent,
        loadChildren: () => import('./features/registrar/registrar.module').then(m => m.RegistrarModule)
      },

      {
        path: 'school-config',  component: SchoolConfigLayoutComponent,
        loadChildren: () => import('./features/school-config/school-config.module').then(m => m.SchoolConfigModule)
      },

      {
        path: 'schools',  component: SchoolConfigLayoutComponent,
        loadChildren: () => import('./features/schools/schools.module').then(m => m.SchoolsModule)
      },

      {
        path: '**',  component: PageNotFoundComponent,
      },
      
    ]
  },

  {
    path: 'dashboard/company',
    canActivate: [AuthGuard], component: DashboardLayoutComponent,
    loadChildren: () => import('./features/company/company.module').then(m => m.CompanyModule)
  },

  {
    path: 'dashboard/country',
    canActivate: [AuthGuard], component: DashboardLayoutComponent,
    loadChildren: () => import('./features/country/country.module').then(m => m.CountryModule)
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: NetworkAwarePreloadService,
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
