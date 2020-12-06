import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteServiceService } from 'src/app/services/notes/note-service.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget; //con esta funciona estamos una funcion para poder usar el evento en el ts
}

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {


  public formularioCreado: FormGroup;
  public file: File;
  public imageOnSelected: string | ArrayBuffer;

  constructor(private _formBuilder: FormBuilder, private _noteService: NoteServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.crearFOmurlario();
  }

  crearFOmurlario() {
    this.formularioCreado = this._formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  crearNota() {
    let body = {
      titulo: this.formularioCreado.value.titulo,
      descripcion: this.formularioCreado.value.descripcion,
      img: this.file
    }
    let token = JSON.parse(localStorage.getItem('token'));
    this._noteService.addNote(body, token).subscribe(
      res => {
        this._router.navigate(['/notes']);
      },
      err => {
        console.log(err);
      }
    );
  }

  imageSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageOnSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

}
