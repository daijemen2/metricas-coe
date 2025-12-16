import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Metric {
  equipo: string;
  tribu: string;
  coe: string;
  puntuacion: number;
  timestamp: string;
  resumen: [string, number][];
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>(`${this.apiUrl}/api/metrics`);
  }

  getMetricByEquipo(equipo: string): Observable<Metric> {
    return this.http.get<Metric>(`${this.apiUrl}/api/metrics/${equipo}`);
  }
}