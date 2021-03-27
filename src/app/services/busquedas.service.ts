import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

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
  
  buscar( tipo:'usuarios' | 'medicos' | 'hospitales', termino: string ) {
    return this.http.get<any[]>(`${base_url}/search/${tipo}/${termino}`, this.headers)
                      .pipe(
                        map( (res: any) => {
                          switch(tipo) {
                            case 'usuarios':
                              return this.transformarUsuarios(res.result);
                              break;
                            case 'medicos':
                              return this.transformarUsuarios(res.result);
                              break;
                            case 'hospitales':
                              return this.transformarUsuarios(res.result);
                              break;
                            default:
                              return [];
                          }
                        })
                      );
  }
}
