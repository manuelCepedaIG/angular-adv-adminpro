import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private fileUploadService: FileUploadService) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( (res: any) => {
        //console.log(res);
        const nombre = res.usuario.nombre;
        const email = res.usuario.email;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado Exitoso', 'Cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Hay un problema', err.error.msg, 'error');
      })
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;
    if( !file ){
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService
          .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
          .then( img => {
            this.usuario.img = img;
            Swal.fire('Guardado Exitoso', 'Imagen actualizada', 'success');
          }, (err) => {
            Swal.fire('Hay un problema', 'No se pudo subir la imagen', 'error');
          });
  }
}
