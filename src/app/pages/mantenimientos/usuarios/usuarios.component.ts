import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public skip: number = 0;
  public limit: number = 5;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              public modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarUsuarios() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  cambiarPagina( valor: number) {
    this.skip += valor;
    if(this.skip < 0) {
      this.skip = 0;
    }
    else if(this.skip >= this.totalUsuarios){
      this.skip -= valor;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.skip, this.limit).subscribe( (CargarUsuario) => {
      this.totalUsuarios = CargarUsuario.total;
      this.usuarios = CargarUsuario.usuarios;
      this.usuariosTemp = CargarUsuario.usuarios;
      this.cargando = false;
    })
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.usuarios = this.usuariosTemp ;
    }

    this.busquedasService.buscar('usuarios', termino)
          .subscribe( res => { 
            this.usuarios = res;
          });
  }
  
  eliminarUsuario(usuario: Usuario) {

    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', 'No puede borrar el mismo usuario de la sesión', 'error')
    }

    Swal.fire({
      title: 'Estás seguro?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar usuario'
    }).then( (res) => {
      if(res.value) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe( res => {
            Swal.fire(
              'Usuario eliminado',
              `El usuario ${usuario.nombre}ha sido eliminado exitosamente`,
              'success'
            )
            this.cargarUsuarios();
          });

      }
    });
  }
  
  cambiarRole(usuario: Usuario, event) {
    let previousValue = event.target.selectedOptions[0].previousSibling.value;
    Swal.fire({
      title: 'Estás seguro?',
      text: `Esta a punto de actualizar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar usuario'
    }).then( (res) => {
      if(res.value) {
         // handle confirm
        this.usuarioService.guardarUsuario(usuario)
          .subscribe( res => {
            Swal.fire(
              'Usuario actualizado',
              `El usuario ${usuario.nombre}ha sido actualizado exitosamente`,
              'success'
            )
            this.cargarUsuarios();
          });
      }
      else {
        // handle cancel
        usuario.role = previousValue;
      }
    });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
