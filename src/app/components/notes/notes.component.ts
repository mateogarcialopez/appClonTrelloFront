import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/notes/note-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public token;
  public notes;
  constructor(private _noteService: NoteServiceService) {

  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.listNotes();
  }

  listNotes() {
    this._noteService.getNotes(JSON.parse(this.token)).subscribe(
      Response => {
        this.notes = Response.notes
      },
      error => {
        console.log(error);
      }
    );
  }

}
