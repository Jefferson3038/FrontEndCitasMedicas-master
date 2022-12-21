import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router) { }
  data: any;
  dataNombre:any;

  ngOnInit(): void {
    if(localStorage.getItem('user') == null){
        this.router.navigate(['/login']);
    } else{
      this.data = JSON.parse(localStorage.getItem('user') || '{}')?.rlCodigo;
      this.dataNombre=JSON.parse(localStorage.getItem('user') || '{}')?.userNombre;
    }
  }

  logout(){
    localStorage.removeItem('user');
    window.location.reload();
    this.router.navigate(['/login']);
   
  }

}
