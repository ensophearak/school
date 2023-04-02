import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPanelComponent } from './pages/dashboard-panel/dashboard-panel.component';
const routes: Routes = [
    { path: '', component: DashboardPanelComponent, title:'Dashboard' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
