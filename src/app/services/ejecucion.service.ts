import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 🔹 Lista completa (tabla)
  getEjecucion(): Observable<EjecucionMetric[]> {
    return this.http.get<EjecucionMetric[]>(
      `${this.apiUrl}/api/ejecucion`
    );
  }

  // 🔹 Detalle por equipo (opcional)
  getEjecucionByEquipo(equipo: string): Observable<EjecucionMetric> {
    return this.http.get<EjecucionMetric>(
      `${this.apiUrl}/api/ejecucion/${equipo}`
    );
  }
}
