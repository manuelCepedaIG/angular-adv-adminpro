import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';

import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];


  constructor(private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ busqueda }) => {
        this.busquedaGlobal(busqueda);
      })
  }

  busquedaGlobal(busqueda: string) {
    this.busquedasService.buscarGlobal(busqueda)
      .subscribe( (res:any) => {
        this.usuarios = res.usuarios;
        this.medicos = res.medicos;
        this.hospitales = res.hospitales;
      })
  }

  abrirMedico(medico: Medico){
    this.router.navigateByUrl(`/dashboard/medicos/nuevoMedico/${medico._id}`);
  }

}
