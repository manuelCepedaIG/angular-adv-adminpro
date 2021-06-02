import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

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

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
        user => new Usuario(
                      user.nombre, 
                      user.email,
                      '',
                      user.img,
                      user.google,
                      user.role,
                      user.uid) 
    );

  }

  private transformarHospitales(resultados: any[]): Hospital[] {
    return resultados; 
  }

  private transformarMedicos(resultados: any[]): Medico[] {
    return resultados;

  }
  
  buscar( tipo:'usuarios' | 'medicos' | 'hospitales', termino: string ) {
    return this.http.get<any[]>(`${base_url}/search/${tipo}/${termino}`, this.headers)
                      .pipe(
                        map( (res: any) => {
                          switch(tipo) {
                            case 'usuarios':
                              return this.transformarUsuarios(res.result);
                              break;
                            case 'medicos':
                              return this.transformarMedicos(res.result);
                              break;
                            case 'hospitales':
                              return this.transformarHospitales(res.result);
                              break;
                            default:
                              return [];
                          }
                        })
                      );
  }

  buscarGlobal( busqueda: string ) {
    const url = `${base_url}/search/${busqueda}`;
    return this.http.get<any[]>( url, this.headers );
  }

}
