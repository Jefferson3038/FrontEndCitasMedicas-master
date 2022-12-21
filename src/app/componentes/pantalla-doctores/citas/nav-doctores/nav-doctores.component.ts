import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-doctores',
  templateUrl: './nav-doctores.component.html',
  styleUrls: ['./nav-doctores.component.css']
})
export class NavDoctoresComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
  }

}
