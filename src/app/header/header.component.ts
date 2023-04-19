import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UniversityServiceService } from '../university-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string | null = null;

  constructor(
    private authService: AuthService,
    private universityService: UniversityServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
