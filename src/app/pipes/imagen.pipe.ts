import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    if(!img){
      return `${base_url}/upload/${tipo}/no-img`;
    }
    else if(img.includes('https')){
        return img;
    }
    else if(img) {
        return `${base_url}/upload/${tipo}/${img}`;
    }
    return `${base_url}/upload/${tipo}/no-img`;
    
    }

}
