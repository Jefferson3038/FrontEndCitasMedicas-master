import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-pacientes',
  templateUrl: './nav-pacientes.component.html',
  styleUrls: ['./nav-pacientes.component.css']
})
export class NavPacientesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
  }

}
