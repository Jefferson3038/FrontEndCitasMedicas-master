import { Component,OnInit } from '@angular/core';
import { Citas } from 'src/app/models/citas';
import { CitasService } from 'src/app/Services/citas.service';
import {MatDialog} from '@angular/material/dialog';
import { ActualizarCitaComponent } from './actualizar-cita/actualizar-cita.component';
import Swal from 'sweetalert2';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})

export class CitasComponent implements OnInit {
  cita:Citas = new Citas();
  datatable:any = [];
  titulo:string;  
  data:any;
  dataCodigo:any;
  doctorCodigo:number=0;

  constructor(private citaService:CitasService,private router:Router, 
  private doctorService:DoctorService, private pacienteService:PacientesService,private dialog?:MatDialog,
   )
    {
    }

  ngOnInit(): void{
    if(localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
    this.data = JSON.parse(localStorage.getItem('user') || '{}')?.rlCodigo;
    this.dataCodigo= JSON.parse(localStorage.getItem('user') || '{}')?.userCodigo;
    this.doctorCodigo=Number(this.dataCodigo);
    this.onDataTable();
  }

  openDialog(): void {
    if(this.dialog){
      const dialogRef = this.dialog.open(ActualizarCitaComponent, {
      width: '50%',
      data: this.cita
      });
      dialogRef.afterClosed().subscribe(
        res=>{
          this.onDataTable()
        }
      )
    }
  }

  onDataTable(){
    if(this.data==1){
      this.citaService.getCita("A",this.doctorCodigo).subscribe(res=>{
        this.datatable=res;
      });
      this.titulo="Citas";
    }
    else{
      this.citaService.getCita("A").subscribe(res=>{
        this.datatable=res;
      });
      this.titulo="Citas";
    }
  }

  onDataTableEliminados(){
    this.citaService.getCita("D",this.doctorCodigo).subscribe(res=>{
      this.datatable=res;
    });
    this.titulo="Citas canceladas";
  }

  onDeleteCita(select:any):void{
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Este elemento sera cancelada",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result)=>{
      if(result.value){
        this.citaService.deleteCita(select.ctCodigo).subscribe(res => {
          if(res){
            Swal.fire("Cancelada",'Se cancelo la cita de manera exitosa','success')
            this.clear();
            this.onDataTable();
          } else {
            alert('Error!')
          }
        });
      }
      return false
    })
  }

  onRestaurar(select:any):void{
    this.citaService.updateCita(select.ctCodigo, select).subscribe(res => {
      if(res){
        Swal.fire("Restaurado",'Se ha restaurado la cita de manera exitosa','success')
        this.clear();
        this.onDataTableEliminados();
      } else {
        alert('Error!')
      }
    })
  }

  onSetData(select:any){
    this.cita.CtCodigo = select.ctCodigo;
    this.cita.PacCodigo = select.pacCodigo;
    this.cita.CtDescripcion = select.ctDescripcion;
    this.cita.DocCodigo = select.docCodigo;
    this.cita.CtHorarioFinal = select.ctHorarioFinal;
    this.cita.CtHorarioInicial = select.ctHorarioInicial;
    console.log(this.cita)
    this.openDialog();
  }

  clear(){
    this.cita.CtCodigo = 0;
    this.cita.PacCodigo = 0;
    this.cita.CtDescripcion = "";
    this.cita.DocCodigo = 0;
    this.cita.CtHorarioFinal = new Date();
    this.cita.CtHorarioInicial = new Date();
  }

  vistaAgregar(){
    this.router.navigate(["/Agregar-cita"]);
  }
}
