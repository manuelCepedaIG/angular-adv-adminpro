import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html'
})
export class Grafica1Component  {

  public labels1: string[] = ['tacos', 'chunchullo', 'carne asada'];
  public data1 = [
    [123, 100, 400]
  ];
}