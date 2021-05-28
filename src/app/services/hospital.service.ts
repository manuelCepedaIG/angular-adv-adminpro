import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment.prod';

import { Router } from '@angular/router';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  
  cargarHospitales() {
    return this.http.get(`${base_url}/hospitales`, this.headers)
                      .pipe(
                        delay(300),
                        map( (res: {ok: boolean, hospitales: Hospital[]}) => res.hospitales) 
                      );
  }

  crearHospital(nombre: string ) {
    const url = `${base_url}/hospitales/`;
    const email = localStorage.getItem('email');
    return this.http.post(url, {nombre, email}, this.headers);
  }

  actualizarHospital(_id: string, nombre: string ) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, {nombre}, this.headers);
  }

  borrarHospital(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url,  this.headers);
  }
}
