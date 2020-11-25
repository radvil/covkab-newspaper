import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CovidIdService {

  baseUrl = 'https://indonesia-covid-19.mathdro.id/api';

  constructor(private http: HttpClient) {}

  getCurrentStats(): Observable<any> {
    const url = this.baseUrl;
    return this.http.get<any>(url);
  }

  getStatsPerProv(): Observable<any> {
    const url = `${this.baseUrl}/provinsi`;
    return this.http.get<any>(url);
  }

  getDailyStats(): Observable<any> {
    const url = `${this.baseUrl}/harian`;
    return this.http.get<any>(url);
  }
}
