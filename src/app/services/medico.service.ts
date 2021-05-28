import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment.prod';

import { Router } from '@angular/router';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'x-token' : this.token
      }
    }
  }

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) { 
  }

  
  cargarMedicos() {
    const url = `${base_url}/medicos/`;
    return this.http.get(url, this.headers)
                      .pipe(
                        delay(300),
                        map( (res: {ok: boolean, medicos: Medico[]}) => res.medicos) 
                      );
  }

  obtenerMedicoPorId(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers)
                      .pipe(
                        delay(300),
                        map( (res: {ok: boolean, medico: Medico}) => res.medico) 
                      );
  }

  crearMedico( medico : { nombre: string, hospital: string }) {
    const url = `${base_url}/medicos/`;
    const email = localStorage.getItem('email');
    return this.http.post(url, {medico, email}, this.headers);
  }

  actualizarMedico( medico ) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, { medico }, this.headers);
  }

  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url,  this.headers);
  }
}
