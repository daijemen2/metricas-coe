import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // 👈 CLAVE

import {
  EjecucionService,
  EjecucionMetric
} from '../../services/ejecucion.service';

import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-dashboard-ejecucion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,        
    FiltersComponent
  ],
  templateUrl: './dashboard-ejecucion.component.html'
})
export class DashboardEjecucionComponent implements OnInit {

  /* =========================
     DATA
     ========================= */

  metrics = signal<EjecucionMetric[]>([]);
  filteredMetrics: EjecucionMetric[] = [];

  tribus: string[] = [];
  coes: string[] = [];

  filtros = {
    tribu: '',
    coe: '',
    search: ''
  };

  filtrosActivos = false;

  constructor(private ejecucionService: EjecucionService) {}

  /* =========================
     INIT
     ========================= */

  ngOnInit(): void {
    this.ejecucionService.getEjecucion().subscribe(data => {
      this.metrics.set(data);

      this.tribus = Array.from(new Set(data.map(d => d.tribu))).sort();
      this.coes = Array.from(new Set(data.map(d => d.coe))).sort();
    });
  }

  /* =========================
     FILTROS
     ========================= */

  recibirFiltros(event: any): void {
    this.filtros = event;
    this.filtrosActivos = event.activo;

    if (this.filtrosActivos) {
      this.aplicarFiltros();
    } else {
      this.filteredMetrics = [];
    }
  }

  aplicarFiltros(): void {
    const lista = this.metrics();

    this.filteredMetrics = lista.filter(m =>
      (!this.filtros.tribu || m.tribu === this.filtros.tribu) &&
      (!this.filtros.coe || m.coe === this.filtros.coe) &&
      (!this.filtros.search ||
        m.equipo.toLowerCase().includes(this.filtros.search.toLowerCase()))
    );
  }

  /* =========================
     UX – BARRAS
     ========================= */

  getBarClass(valor: number): string {
    if (valor < 40) return 'bg-red-500';
    if (valor < 70) return 'bg-yellow-400';
    return 'bg-green-500';
  }
}
