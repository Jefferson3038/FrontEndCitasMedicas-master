import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pacientes } from 'src/app/models/pacientes';
import { Usuarios } from 'src/app/models/usuarios';
import { PacientesService } from 'src/app/Services/pacientes.service';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-pacientes',
  templateUrl: './registro-pacientes.component.html',
  styleUrls: ['./registro-pacientes.component.css']
})
export class RegistroPacientesComponent implements OnInit {
  type:string = "password";
  isText:boolean=false;
  eyeIcon: string="fa-eye-slash";
  Paciente:Pacientes= new Pacientes();
  usuario:Usuarios = new Usuarios();

  constructor(private pacienteService:PacientesService,private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  clear(){
    this.Paciente.PacCodigo=0;
    this.Paciente.PacNombre="";
    this.Paciente.PacApellido="";
    this.Paciente.PacFechaNacimiento= new Date();
    this.Paciente.PacTelefono="";
    this.Paciente.PacEmail="";
    this.Paciente.PacDireccion="";
    this.Paciente.PacTelefono="";
    this.usuario.UserNombre="";
    this.usuario.UserPassword="";
  }

  SingUpPacientes(Paciente:Pacientes):void{
    this.usuario.RlCodigo=2;
    this.usuarioService.addUsuarios(this.usuario).subscribe(res=>{
      var da = JSON.stringify(res);
      var data = JSON.parse(da).userCodigo;
      this.Paciente.PacCodigo=Number(data);
      this.Paciente.UserCodigo=data;
      this.pacienteService.addPaciente(Paciente).subscribe(res=>{
        if(res){
          Swal.fire("Agregado",'Se ha registrado el paciente '+this.Paciente.PacNombre+' '+this.Paciente.PacApellido+' de manera exitosa','success')
          this.clear();
          this.RedirigiraLogin()
        }
        else{
          alert("Error!")
        }
      })
    }, error=>Swal.fire("Error","Este usuario ya existe",'error'));
  }

  RedirigiraLogin(){
    this.router.navigate(["/login"]);
  }

  hideShowPass() {
    this.isText=!this.isText;
    this.isText? this.eyeIcon ="fa-eye":this.eyeIcon  ="fa-eye-slash";
    this.isText? this.type="text":this.type="password";
    }

}
