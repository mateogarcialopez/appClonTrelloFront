import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formularioCreado: FormGroup;
  public token;
  public user;
  constructor(private _formBuilder: FormBuilder, private _userService: UserServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formularioCreado = this._formBuilder.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      contrasena: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
    });
  }

  login() {
    //this.formularioCreado.reset();
    this._userService.login(this.formularioCreado.value).subscribe(
      Response => {
        if (Response.status) {
          this.token = Response.token;
          this.user = Response.user;
          localStorage.setItem('token', JSON.stringify(this.token));
          localStorage.setItem('user', JSON.stringify(this.user));
          this._router.navigate(['/notes']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
