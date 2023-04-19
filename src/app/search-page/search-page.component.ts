import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UniversityServiceService, University } from '../university-service.service'

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  userName: string | null = null;
  searchCount: number = 0;
  countries: string[] = [
    'United States',
    'Canada',
    'United Kingdom',
    'India',
    'Australia',
    'Germany',
    'France',
  ];
  selectedCountry: string = this.countries[0];
  otherCountry: string = '';
  universities: University[] = [];
  displayedColumns: string[] = ['name', 'stateProvince', 'domain'];

  constructor(
    private authService: AuthService,
    private universityService: UniversityServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    this.searchCount++;

    if (this.otherCountry.trim()) {
      this.selectedCountry = this.otherCountry;
    }

    this.universityService
      .getUniversitiesByCountry(this.selectedCountry)
      .subscribe((universities) => {
        this.universities = universities;
      }
    );
  }
}
