import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { MedicoService } from '../../../services/medico.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public totalMedicos: number = 0;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];

  public skip: number = 0;
  public limit: number = 5;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private medicoService: MedicoService,
    private busquedasService: BusquedasService,
    public modalImagenService: ModalImagenService,
    private router: Router) { }

  
  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarMedicos() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe( medicosRes => {
      this.medicos = medicosRes;
      this.cargando = false;
      this.totalMedicos = this.medicos.length;
    });
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarMedicos() ;
    }

    this.busquedasService.buscar('medicos', termino)
          .subscribe( res => { 
            this.medicos = res;
          });
  }
  
  eliminarMedico(medico: Medico) {

    Swal.fire({
      title: 'Estás seguro?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar medico'
    }).then( (res) => {
      if(res.value) {
        this.medicoService.borrarMedico(medico._id)
          .subscribe( res => {
            Swal.fire(
              'Medico eliminado',
              `El medico ${medico.nombre} ha sido eliminado exitosamente`,
              'success'
            )
            this.cargarMedicos();
          });

      }
    });
  }
  

  abrirModal(medico: Medico) {
    console.log(medico);
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  editarMedico(medico: Medico) {
    /*this.medicoService.actualizarMedico(medico._id, medico.nombre)
      .subscribe( res => {
        Swal.fire('Datos guardados', medico.nombre, 'success');
      });*/
      this.router.navigateByUrl(`/dashboard/medicos/nuevoMedico/${medico._id}`);
  }

  async crearMedicoModal(){
    /*const { value } = await Swal.fire<string>({
      input: 'text',
      inputPlaceholder: 'Nombre del medico',
      showCancelButton: true,
      text: 'Ingrese el nombre del nuevo medico',
      title: 'Crear Medico'
    })

    if(value.trim().length > 0) {
      this.medicoService.crearMedico(value)
        .subscribe( (res: any) => {
          this.medicos.push( res.Medico);
          this.cargarMedicos();
        });
    }*/

    this.router.navigateByUrl('/dashboard/medicos/nuevoMedico');
  }
}
