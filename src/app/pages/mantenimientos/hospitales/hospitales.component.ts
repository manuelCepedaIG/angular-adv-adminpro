import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { HospitalService } from '../../../services/hospital.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public totalHospitales: number = 0;
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];

  public skip: number = 0;
  public limit: number = 5;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
    private busquedasService: BusquedasService,
    public modalImagenService: ModalImagenService) { }

  
  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarHospitales() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe( hospitalesRes => {
      this.hospitales = hospitalesRes;
      this.cargando = false;
      this.totalHospitales = this.hospitales.length;
    });
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarHospitales() ;
    }

    this.busquedasService.buscar('hospitales', termino)
          .subscribe( res => { 
            this.hospitales = res;
          });
  }
  
  eliminarHospital(hospital: Hospital) {

    Swal.fire({
      title: 'Estás seguro?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar hospital'
    }).then( (res) => {
      if(res.value) {
        this.hospitalService.borrarHospital(hospital._id)
          .subscribe( res => {
            Swal.fire(
              'Hospital eliminado',
              `El hospital ${hospital.nombre}ha sido eliminado exitosamente`,
              'success'
            )
            this.cargarHospitales();
          });

      }
    });
  }
  

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe( res => {
        Swal.fire('Datos guardados', hospital.nombre, 'success');
      });
  }

  async crearHospitalModal(){
    const { value } = await Swal.fire<string>({
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
      text: 'Ingrese el nombre del nuevo hospital',
      title: 'Crear Hospital'
    })

    if(value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe( (res: any) => {
          this.hospitales.push( res.Hospital);
          this.cargarHospitales();
        });
    }
  }
}
