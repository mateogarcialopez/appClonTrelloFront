import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app-note-front';
  userGoogle: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService) {

  }

  ngOnInit() {
    this.authService.authState.subscribe((userGoogle) => {
      this.userGoogle = userGoogle;
      this.loggedIn = (userGoogle != null);
    });
    console.log(this.userGoogle);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
