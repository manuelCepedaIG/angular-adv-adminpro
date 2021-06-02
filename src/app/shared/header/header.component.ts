import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { 
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

  buscar( busqueda: string){
    if(busqueda.length === 0){
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${busqueda}`)
  }



}
