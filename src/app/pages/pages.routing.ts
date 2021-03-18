import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { RxjsComponent } from './rxjs/rxjs.component';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PromisesComponent } from './promises/promises.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent ,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'AccountSettings' }},
            { path: 'grafica1', component: Grafica1Component, data: { title: 'Graphic 1' }},
            { path: 'perfil', component: PerfilComponent,  data: { title: 'Perfil de usuario' }},
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises' }},
            { path: 'rxjs', component: RxjsComponent,  data: { title: 'Rxjs' }},
        ]
    },
]


@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule {}