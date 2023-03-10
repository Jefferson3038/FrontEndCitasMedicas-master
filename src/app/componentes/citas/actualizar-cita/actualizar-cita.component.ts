import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Citas } from 'src/app/models/citas';
import { CitasService } from 'src/app/Services/citas.service';
import Swal from 'sweetalert2';
import { Component, OnInit, Inject} from '@angular/core';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-cita',
  templateUrl: './actualizar-cita.component.html',
  styleUrls: ['./actualizar-cita.component.css']
})

export class ActualizarCitaComponent implements OnInit {
  listaDoctores:any =[];
  listaPacientes:any=[];

 constructor(private citasService:CitasService, public dialogRef:MatDialogRef<ActualizarCitaComponent>, 
  @Inject(MAT_DIALOG_DATA) public citas:Citas,private doctorService:DoctorService,private pacienteService:PacientesService,
  private router:Router) {   
   }
   
  ngOnInit(): void {
    if(localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
    this.obtenerDoctores();
    this.obtenerPacientes();
  }

  obtenerDoctores(){
    this.doctorService.getDoctor("A").subscribe(res=>{
      this.listaDoctores=res;
    });
  }

  obtenerPacientes(){
    this.pacienteService.getPaciente("A").subscribe(res=>{
      this.listaPacientes=res;
    });
  }

  onUpdateDoctor(citas:Citas):void{
    this.citasService.updateCita(citas.CtCodigo, citas).subscribe(res => {
      if(res){
        Swal.fire("Actualizado",'Se ha actualizado la cita de manera exitosa','success')
        this.cerrarDialog();
        this.clear();
      }
     else {
      alert('error')    
    }}, error=> Swal.fire("Error","El horario ya esta ocupado o verficiar el horario final de la cita","error"));
  }

  clear(){
    this.citas.CtCodigo = 0;
    this.citas.PacCodigo = 0;
    this.citas.CtDescripcion = "";
    this.citas.DocCodigo = 0;
    this.citas.CtHorarioFinal = new Date();
    this.citas.CtHorarioInicial = new Date();
  }

  onDeleteDoctor(citas:Citas):void{
    Swal.fire({
      title: "??Esta seguro?",
      text: "Este elemento sera cancelada",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result)=>{
      if(result.value){
        this.citasService.deleteCita(citas.CtCodigo).subscribe(res => {
          if(res){
            this.clear();
            this.cerrarDialog();
            Swal.fire("Desactivado",'Se ha cancelado la cita de manera exitosa','success')
          } else {
            alert('Error!')
          }
        });
      }
      return false
    })
  }
  
  cerrarDialog():void{
    this.dialogRef.close();
  }
}
