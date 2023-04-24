import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UniversityServiceService, University } from '../university-service.service'
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  userName: string | null = null;
  searchCount: number = 0;
  countries: string[] = [
    'Select Country',
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
  showTable = false;
  isLoading = false;
  length: number = 0;
  pageSize: number = 10
  pageSizeOptions: number[] = [5, 10, 15];
  allUniversities: University[] = [];



  constructor(
    private authService: AuthService,
    private universityService: UniversityServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.searchCount = Number(localStorage.getItem('searchCount')) || 0;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch(): void {
    this.searchCount++;
    localStorage.setItem('searchCount', this.searchCount.toString());
    this.isLoading = true;
    if (this.otherCountry.trim()) {
      this.selectedCountry = this.otherCountry;
    }
    this.universityService
      .getUniversitiesByCountry(this.selectedCountry)
      .subscribe((universities) => {
        this.isLoading = false;
        this.allUniversities = universities;
        this.universities = this.allUniversities.slice(0, this.pageSize);
        this.length = universities.length; // Set the length property
      });
    this.showTable = true;
  }
  
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.universities = this.allUniversities.slice(startIndex, endIndex);
  }
  
}

