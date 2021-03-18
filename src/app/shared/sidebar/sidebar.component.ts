import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[];
  public usuario: Usuario;

  constructor( private sibebarService: SidebarService,
              private usuarioService: UsuarioService) { 
    this.menuItems = this.sibebarService.menu;
    this.usuario = this.usuarioService.usuario;
  }

}
