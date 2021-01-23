import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent ,
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'grafica1', component: Grafica1Component, data: { title: 'Graphic 1' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'AccountSettings' }},
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises' }},
            { path: 'rxjs', component:RxjsComponent,  data: { title: 'Rxjs' }},
        ]
    },
]


@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule {}