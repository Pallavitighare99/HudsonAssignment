import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// university.service.ts
export interface University {
  name: string;
  country: string;
  'state-province': string | null;
  webPages: string[];
  alpha_two_code: string;
  domains: string[];
}


@Injectable({
  providedIn: 'root'
})
export class UniversityServiceService {

  private readonly API_BASE_URL = 'http://universities.hipolabs.com/search';

  constructor(private http: HttpClient) { }

  getUniversitiesByCountry(country: string): Observable<University[]> {
    // const offset = pageIndex * pageSize;
    return this.http.get<University[]>(`${this.API_BASE_URL}?country=${country}`);
}

  getUniversitiesByCountryAndName(country: string, name: string): Observable<University[]> {
    return this.http.get<University[]>(`${this.API_BASE_URL}?country=${country}&name=${name}`);
  }
}
