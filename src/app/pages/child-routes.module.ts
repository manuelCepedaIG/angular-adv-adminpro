import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsComponent } from './rxjs/rxjs.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PromisesComponent } from './promises/promises.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { NuevoComponent } from './mantenimientos/medicos/nuevo/nuevo.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes : Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'AccountSettings' }},
  { path: 'buscar/:busqueda', component: BusquedaComponent,  data: { title: 'Buscar' }},
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Graphic 1' }},
  { path: 'perfil', component: PerfilComponent,  data: { title: 'Perfil de usuario' }},
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promises' }},
  { path: 'rxjs', component: RxjsComponent,  data: { title: 'Rxjs' }},

  //Mantenimientos
  { path: 'hospitales', component: HospitalesComponent,  data: { title: 'Hospitales de adminpro' }},
  { path: 'medicos', component: MedicosComponent, data: { title: 'Medicos de adminpro', }},
  { path: 'medicos/nuevoMedico', component: NuevoComponent,  data: { title: 'Creación de médico de adminpro' }},
  { path: 'medicos/nuevoMedico/:id', component: NuevoComponent,  data: { title: 'Creación de médico de adminpro' }},

  //Rutas de Admin
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent,  data: { title: 'Usuarios de adminpro' }},
  
]


@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
