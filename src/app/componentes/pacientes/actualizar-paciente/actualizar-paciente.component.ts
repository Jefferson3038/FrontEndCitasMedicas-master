import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pacientes } from 'src/app/models/pacientes';
import { CitasService } from 'src/app/Services/citas.service';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-paciente',
  templateUrl: './actualizar-paciente.component.html',
  styleUrls: ['./actualizar-paciente.component.css']
})
export class ActualizarPacienteComponent implements OnInit {
  validacionCitas:any=[];
  
  constructor(private pacienteServie:PacientesService,private userService:UsuarioService, public dialogRef:MatDialogRef<ActualizarPacienteComponent>,
    private citasService:CitasService, @Inject(MAT_DIALOG_DATA) public paciente:Pacientes, private router:Router) {   
  }
  
 ngOnInit(): void {
  if(localStorage.getItem('user') == null){
    this.router.navigate(['/login']);
  }
  this.citasService.getCita("A").subscribe(res=>{
    this.validacionCitas=res;
  });
 }

 onUpdate(paciente:Pacientes):void{
   this.pacienteServie.updatePaciente(paciente.PacCodigo, paciente).subscribe(res => {
     if(res){
       Swal.fire("Actualizado",'Se ha actualizado el doctor '+this.paciente.PacNombre+' '+this.paciente.PacApellido+' de manera exitosa','success')
       this.cerrarDialog();
       this.clear();
     } else {
       alert('Error!')
     }
   })
 }

 clear(){
  this.paciente.PacCodigo=0;
  this.paciente.PacNombre="";
  this.paciente.PacApellido="";
  this.paciente.PacTelefono="";
  this.paciente.PacEmail="";
  this.paciente.PacFechaNacimiento= new Date();
  this.paciente.UserCodigo=0;
}

onDelete(paciente:Pacientes){
  if (this.validacionEliminar(paciente.PacCodigo)){
    this.eliminar(paciente)
  }
  else if(this.validacionEliminar(paciente.PacCodigo)==false){
    Swal.fire("Error","No se puede desactivar este paciente, porque esta asignado a una cita","error")
  }
}

 eliminar(paciente:Pacientes):void{
  Swal.fire({
    title: "¿Esta seguro?",
    text: "Este elemento sera desactivado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, desactivar',
    cancelButtonText: 'No, mantener'
  }).then((result)=>{
    if(result.value){
      this.userService.deleteUsuarios(paciente.PacCodigo).subscribe(res=>{
        if (res){
          console.log(res)
        }
        else{
          alert('Error!')
        }
      });
      this.pacienteServie.deletePaciente(paciente.PacCodigo).subscribe(res => {
        if(res){
          this.clear();
          this.cerrarDialog();
          Swal.fire("Desactivado",'Se ha desactivado el paciente '+this.paciente.PacNombre+' '+this.paciente.PacApellido+' de manera exitosa','success')
        } else {
          alert('Error!')
        }
      });
    }
    return false
  })
}

validacionEliminar(id:number){
  let validacion:boolean=true;
  let valor:number=0;
  for(let item of this.validacionCitas){
     valor = item.pacCodigo
    if(valor==id){
      validacion=false;
      break;
    }
  }
  return validacion
}

 cerrarDialog():void{
   this.dialogRef.close();
 }

}
