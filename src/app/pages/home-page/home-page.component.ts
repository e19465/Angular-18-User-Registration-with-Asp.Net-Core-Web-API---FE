import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MainLayoutComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  fullName = '';
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (response: any) => {
        console.log(response);
        this.fullName = response.fullName;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
