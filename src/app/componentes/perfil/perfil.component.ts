import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  dataNombre:any
  data:any
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
    this.dataNombre=JSON.parse(localStorage.getItem('user') || '{}')?.userNombre;
    this.data=JSON.parse(localStorage.getItem('user') || '{}')?.rlCodigo;
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
