import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
    /*const promesa = new Promise( (resolve, reject) => {
      if( true ) {
        resolve('Hola Mundo');
      }
      else {
        reject('Algo salio mal');
      }
    });
    
    promesa.then( (mensaje) => {
      setTimeout(function(){ console.log("Hello " + mensaje); }, 3000);
    })
    .catch( error => console.log('Error en promesa', error))

    console.log('Fin del init');*/
  }

  getUsuarios() {
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => 
        //console.log(resp.json().then(body => console.log(body)))
        resp.json().then( body => resolve(body.data))
      );
    });

    return promesa;
 
  }

}
