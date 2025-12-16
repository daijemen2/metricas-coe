import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Metric {
  equipo: string;
  tribu: string;
  coe: string;
  puntuacion: number;
  timestamp: string;
  resumen: [string, number][];  // lista de pares
}


@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>('/api/metrics');
  }
}
