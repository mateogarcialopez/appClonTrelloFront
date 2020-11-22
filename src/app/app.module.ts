import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './components/users/users.component';
import { NotesComponent } from './components/notes/notes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './services/user/user-service.service';
import { EditNotesComponent } from './components/edit-notes/edit-notes.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    NotesComponent,
    EditNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
