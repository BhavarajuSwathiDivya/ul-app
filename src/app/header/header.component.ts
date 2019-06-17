import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser = {};

  constructor(private router: Router, private authService: AuthService) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
   }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);                     // {3}
  }
}
