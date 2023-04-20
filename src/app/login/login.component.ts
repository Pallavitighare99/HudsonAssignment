// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/search']);
    }
  }

  onSubmit(): void {
    this.authService.login(this.name);
    this.router.navigate(['/search']);
  }

  onCancel(): void {
    this.name = '';
  }
}
