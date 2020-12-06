import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteServiceService } from 'src/app/services/notes/note-service.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget; //con esta funciona estamos una funcion para poder usar el evento en el ts
}

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
})
export class EditNotesComponent implements OnInit {

  public idNote = '';
  public formulario: FormGroup;
  public token = '';
  public titulo = '';
  public descripcion = '';
  public file: File;
  public imageOnSelected: string | ArrayBuffer;

  constructor(private _activaterouter: ActivatedRoute, private _noteService: NoteServiceService, private _formBuilder: FormBuilder, private _router:Router) { }

  ngOnInit(): void {
    this.crearFormulario();
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token'));
      if (this._activaterouter.snapshot.params.id) {
        this.getNote(this._activaterouter.snapshot.params.id, this.token);
      }
    }
  }

  getNote(idNote, token) {
    this._noteService.getNote(idNote, token).subscribe(
      res => {
        this.formulario.setValue({
          titulo: res.note.titulo,
          descripcion: res.note.descripcion,
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  crearFormulario() {
    this.formulario = this._formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      //img: ['']
    });
  }

  edit() {
    //console.log(this.formulario.value)
    let body = {
      titulo: this.formulario.value.titulo,
      descripcion: this.formulario.value.descripcion,
      img: this.file
    };
    this._noteService.updateNote(this.formulario.value.titulo, this.formulario.value.descripcion, this.file, this._activaterouter.snapshot.params.id, this.token).subscribe(
      res => {
        this._router.navigate(['/notes'])
      },
      err => {
        console.log(err);
      }
    );
  }

  imageSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) { //it is validated that when the inputn is clicked, there is an uploaded image
      this.file = <File>event.target.files[0]; // the loaded image is saved in this variable
      //image preview
      const reader = new FileReader(); //the created object is to allow read the file
      reader.onload = e => this.imageOnSelected = reader.result; //
      reader.readAsDataURL(this.file);            
    }
  }


}
