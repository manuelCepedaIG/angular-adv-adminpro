import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url : '/' },
        { titulo: 'ProgressBar', url : 'progress' },
        { titulo: 'graficas', url : 'grafica1' },
        { titulo: 'promises', url : 'promises' },
        { titulo: 'rxjs', url : 'rxjs' },
      ]
    },
  ];

  constructor() { }
}
