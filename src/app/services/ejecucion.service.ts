import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* =========================
   MODELO DE EJECUCIÓN
   ========================= */
export interface EjecucionMetric {
  equipo: string;
  tribu: string;
  coe: string;
  ejecucion: {
    frontendBackend: number;
    seguridad: number;
    performance: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EjecucionService {

  constructor(private http: HttpClient) {}

  // 🔹 Lista completa (tabla)
  getEjecucion(): Observable<EjecucionMetric[]> {
    return this.http.get<EjecucionMetric[]>('/api/ejecucion');
  }

  // 🔹 Detalle por equipo (opcional)
  getEjecucionByEquipo(equipo: string): Observable<EjecucionMetric> {
    return this.http.get<EjecucionMetric>(`/api/ejecucion/${equipo}`);
  }
}
