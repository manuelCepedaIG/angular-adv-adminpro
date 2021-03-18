import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment.prod';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { 
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  validarToken() {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((res:any) => {
        const { nombre, email, google, role, uid, img = '' } = res.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid)
        //console.log(this.usuario);
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError( err => { 
        console.log(err);
        return of(false);
      })
    );
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${base_url}/usuarios`, formData,)
                      .pipe(
                        tap( (res:any) => {
                          localStorage.setItem('token', res.token)
                        })
                      );
  }

  actualizarPerfil( data: {email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
                      headers: {
                        'x-token': this.token
                      }});
  }

  login( formData: LoginForm ) {
    return this.http.post(`${base_url}/login`, formData)
                      .pipe(
                        tap( (res:any) => {
                          localStorage.setItem('token', res.token)
                        })
                      );
  }

  loginGoogle( token ) {
    return this.http.post(`${base_url}/login/google`, {token})
                      .pipe(
                        tap( (res:any) => {
                          localStorage.setItem('token', res.token)
                        })
                      );
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  googleInit() {
    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '456578010715-iqd04u7fjibcj2l6grnagceu4ghoou81.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve();
      });
    });
    
  }
}
