import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/modelUser';
import { UserServiceService } from 'src/app/services/user/user-service.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public formularioTerinado: FormGroup;
  public usuario: User = new User();

  constructor(private _formBuilder: FormBuilder, private _userService: UserServiceService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formularioTerinado = this._formBuilder.group({
      nombre_completo: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      contrasena: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
    });
  }

  registrar() {
    this.usuario.nombresApellidos = this.formularioTerinado.value.nombre_completo;
    this.usuario.email = this.formularioTerinado.value.email;
    this.usuario.contrasena = this.formularioTerinado.value.contrasena;
    this._userService.crearUsuario(this.usuario).subscribe(
      response => {
        this._router.navigate(['/login']);
        if(response.message == 'Usuario almacenado'){
        this.formularioTerinado.reset();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
