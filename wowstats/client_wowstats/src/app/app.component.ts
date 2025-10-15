import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // RouterOutlet allows for <router-outlet>, CommonModule allows for directives(keyword dom property manipulations) in the html document(*ngIf, *ngFor...)
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client_wowstats';
  user?: any = localStorage.getItem('user') || '';

  constructor(public authService: AuthService, private router: Router) {
    console.log(this.user);
    this.user = localStorage.getItem('user');
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (data) => {
        // console.log("logout request: ", data);
      },
      error: (err) => {
        console.log("Error in logout header button", err);
      }

    });
  }
}
