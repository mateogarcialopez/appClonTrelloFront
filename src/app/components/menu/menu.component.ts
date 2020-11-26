import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  userGoogle: SocialUser;
  loggedIn: boolean;
  
  constructor(private authService: SocialAuthService, private _route: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((userGoogle) => {
      this.userGoogle = userGoogle;
      this.loggedIn = (userGoogle != null);
    });
  }

  signOut(): void {
    this.authService.signOut();
    this._route.navigate(['/login']);
  }

}
