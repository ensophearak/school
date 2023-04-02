import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotExistSchoolComponent } from 'src/app/shared/components/not-exist-school/not-exist-school.component';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [
    { path: '', component: HomeComponent,title:'Home' },
    { path: 'school-not-available', component: NotExistSchoolComponent, title: 'School not available' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
