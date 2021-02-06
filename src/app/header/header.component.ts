import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthService} from '../auth/shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string | null;
  isLoggedIn: boolean | null;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = false;
    this.username = null;
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();

  }

  // tslint:disable-next-line:typedef
  logout() {

  }

  // tslint:disable-next-line:typedef
  goToUserProfile() {

  }
}
