import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Citas } from 'src/app/models/citas';
import { CitasService } from 'src/app/Services/citas.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PacientesService } from 'src/app/Services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-create-cita',
  templateUrl: './dialog-create-cita.component.html',
  styleUrls: ['./dialog-create-cita.component.css']
})
export class DialogCreateCitaComponent implements OnInit {
  especialidad:string;
  citas:Citas = new Citas();
  listaDoctores:any =[];
  listaPacientes:any=[];
  data:any;
  dataCodigo:any;
  
 constructor(private citasService:CitasService,private router:Router,
    private doctorService:DoctorService,private pacienteService:PacientesService) {   
   }
   
  ngOnInit(): void {
    if(localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
    this.obtenerDoctores();
    this.obtenerPacientes();
    this.data = JSON.parse(localStorage.getItem('user') || '{}')?.rlCodigo;
    this.dataCodigo = JSON.parse(localStorage.getItem('user') || '{}')?.userCodigo;
  }

  obtenerDoctores(){
    this.doctorService.getDoctor("A").subscribe(res=>{
      this.listaDoctores=res;
    });
  }
  resetDoc(){
    this.citas.DocCodigo=0;
  }
  obtenerPacientes(){
    this.pacienteService.getPaciente("A").subscribe(res=>{
      this.listaPacientes=res;
    });
  }

  clear(){
    this.citas.CtCodigo=0;
    this.citas.CtDescripcion="";
    this.citas.CtHorarioFinal= new Date();
    this.citas.CtHorarioInicial= new Date();
    this.citas.DocCodigo=0;
    this.citas.PacCodigo=0;
    this.especialidad="";
  }

  onAddCita(cita:Citas){
    this.citas.PacCodigo=this.dataCodigo;
    this.citasService.addCita(cita).subscribe(res=>{
      var da = JSON.stringify(res);
      var data = JSON.parse(da).ctEstatus;
      if(data=="Z"){
        Swal.fire("Error",'Este horario ya esta ocupado','error')
      }
      else if(data=="X"){
        Swal.fire("Error",'Este horario final no puede ser mas temprano que el de entrada','error')
      }
      else if(res){
        Swal.fire("Agregado",'Se ha agregado la cita de manera exitosa','success')
        this.clear();
        this.volverCitasLista();
      }
      else{
        alert('Error');
      }
      
  })
  }

  volverCitasLista(){
    if (this.data==2){
      this.router.navigate(["/Cita-pacientes"])
    }
    else{
      this.router.navigate(["/Citas"])
    }
  }
}