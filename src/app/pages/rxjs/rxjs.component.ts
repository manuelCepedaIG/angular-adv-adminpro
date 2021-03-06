import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public internalSubs: Subscription;

  constructor() { 

    //this.retornaObservable().pipe(
    //  retry()
    //).subscribe(
    //  valor => console.log('Subscription: ', valor),
    //  error => console.warn('Subscription: ', error),
    //  () => console.info('Obs terminado')
    //);

    this.internalSubs = this.retornaIntervalo()
      .subscribe(
        (valor) => console.log(valor)
      ) 
  }


  ngOnDestroy(): void {
    this.internalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(1000)
            .pipe(
              map( valor => {
                return valor+1;
              }),
              filter(valor => (valor % 2 === 0) ? true : false ),
              take(10)
    );
  }

  retornaObservable(): Observable<number> {
    
    let i = -1;

    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval( () => {
        i++;
        observer.next(i);

        if(i === 4) {
          clearInterval( intervalo );
          observer.complete();
        }

        if(i === 2) {
          observer.error('mensaje de prueba de error');
        }
      }, 1000 )
    });

    return obs$;
  }
}
