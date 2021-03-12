import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  
  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['datoTest', [Validators.required, Validators.minLength(3)]],
    email: ['datoTest10@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terminos: [true, [Validators.required]],
  }, {
    validators: this.passwordsIguales('password','password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  crearUsuario() {
    this.formSubmitted = true;
    if(this.registerForm.invalid) {
      return;
    }

    //realizar el post
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(res => {
        console.log('usuario creado');
        console.log(res);
      }, (err) => {
        console.warn(err);
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido(campo:string): boolean {
    if(this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  validaPass() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if((pass1 !== pass2) && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  passwordsIguales(pass1Value: string, pass2Value: string) {
    return (formGroup : FormGroup) => {
      const pass1Control = formGroup.get(pass1Value);
      const pass2Control = formGroup.get(pass2Value);
      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }
      else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

}
