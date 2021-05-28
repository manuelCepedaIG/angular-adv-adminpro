import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.model';
import { Hospital } from '../../../../models/hospital.model';

import { HospitalService } from '../../../../services/hospital.service';
import { MedicoService } from '../../../../services/medico.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styles: [
  ]
})
export class NuevoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  
  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedRoute.params
      .subscribe( ({id}) => {
        if(id)
        {
          this.cargarMedico(id);
        }
    })

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['-1', Validators.required],
    })

    this.cargaHospitales();
    this.medicoForm.get('hospital').valueChanges
      .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
    });
  }

  cargarMedico(id: string) {
    this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        
        delay(100)
      )
      .subscribe( res => {
        //console.log(res);
        if(!res) {
          return this.router.navigateByUrl('/dashboard/medicos')
        }
        const { nombre, hospital } = res
        this.medicoSeleccionado = res;
        this.medicoForm.setValue({ nombre, hospital });
      });
  }

  cargaHospitales() {
    this.hospitalService.cargarHospitales()
    .subscribe( (res: Hospital[]) => {
      this.hospitales = res;
    })
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    if(this.medicoSeleccionado) {
      const updateMedico = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(updateMedico)
        .subscribe( (res:any) => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`)
        });
    }
    else {
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe( (res:any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`)
        });
    }
  }
}
