import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditNotesComponent } from './components/edit-notes/edit-notes.component';
import { LoginComponent } from './components/login/login.component';
import { NotesComponent } from './components/notes/notes.component';
import { UsersComponent } from './components/users/users.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddNoteComponent } from './components/add-note/add-note.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'notes', component: NotesComponent },
    { path: 'user', component: UsersComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'newNote', component: AddNoteComponent },
    { path: 'editNote/:id', component: EditNotesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }