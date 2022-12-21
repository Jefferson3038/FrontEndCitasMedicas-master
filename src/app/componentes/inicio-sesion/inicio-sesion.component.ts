import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from 'src/app/models/login';
import { UsuarioService } from 'src/app/Services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  login: login = new login();

  constructor(
    private UsuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.router.navigate(['']);
    }
  }

  onLogin(login: login): void {
    this.UsuarioService.login(this.login).subscribe((res) => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res));
        this.Bienvenida();
      } else {
        Swal.fire('Error', 'Verifique su usuario y contraseña', 'error');
      }
    }, error=>Swal.fire('Error', 'Verifique su usuario y contraseña', 'error'));
  }
  Bienvenida() {
    window.location.reload();
    this.router.navigate(['']);
  }
}
