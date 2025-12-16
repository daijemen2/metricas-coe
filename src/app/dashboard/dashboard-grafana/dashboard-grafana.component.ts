import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MetricsService, Metric } from '../../services/metrics.service';
import { FiltersComponent } from '../filters/filters.component';
import { DateFilterService } from '../../services/date-filter.service';
import { DateFilterValue } from '../date-filter/date-filter.component';

@Component({
  selector: 'app-dashboard-grafana',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FiltersComponent,
    RouterModule
  ],
  templateUrl: './dashboard-grafana.component.html'
})
export class DashboardGrafanaComponent implements OnInit {

  /* =========================
     DATA
     ========================= */

  // Data original
  metrics = signal<Metric[]>([]);

  // Data filtrada
  filteredMetrics: Metric[] = [];

  // Catálogos
  tribus: string[] = [];
  coes: string[] = [];

  // Filtros básicos
  filtros = {
    tribu: '',
    coe: '',
    search: ''
  };

  // Filtro de fecha
  dateFilter: DateFilterValue | null = null;

  // UX
  filtrosActivos = false;

  // Cards resumen
  promedioPuntuacion = 0;
  mejorEquipo = '';
  ultimaFecha = '—';

  constructor(
    private metricsService: MetricsService,
    private dateFilterService: DateFilterService,
    private router: Router
  ) {}

  /* =========================
     INIT
     ========================= */
  ngOnInit(): void {
    this.metricsService.getMetrics().subscribe(data => {

      this.metrics.set(data);

      this.tribus = Array.from(new Set(data.map(m => m.tribu))).sort();
      this.coes = Array.from(new Set(data.map(m => m.coe))).sort();

      // estado inicial
      this.filteredMetrics = [];
      this.resetEstadisticas();
    });
  }

  /* =========================
     FILTROS
     ========================= */
  recibirFiltros(event: any): void {

    this.filtros = {
      tribu: event.tribu,
      coe: event.coe,
      search: event.search
    };

    this.dateFilter = event.date ?? null;
    this.filtrosActivos = event.activo;

    if (this.filtrosActivos) {
      this.aplicarFiltros();
    } else {
      this.filteredMetrics = [];
      this.resetEstadisticas();
    }
  }

  aplicarFiltros(): void {
    const lista = this.metrics();

    this.filteredMetrics = lista.filter(m => {

      // Tribu
      const coincideTribu =
        this.filtros.tribu !== '' ? m.tribu === this.filtros.tribu : true;

      // CoE
      const coincideCoe =
        this.filtros.coe !== '' ? m.coe === this.filtros.coe : true;

      // Search
      const coincideSearch =
        this.filtros.search.trim() !== ''
          ? m.equipo.toLowerCase().includes(this.filtros.search.toLowerCase())
          : true;

      // Fecha
      const coincideFecha =
        this.dateFilter
          ? this.dateFilterService.cumpleFiltroFecha(
              m.timestamp,
              this.dateFilter
            )
          : true;

      return (
        coincideTribu &&
        coincideCoe &&
        coincideSearch &&
        coincideFecha
      );
    });

    this.actualizarEstadisticas();
  }

  /* =========================
     ESTADÍSTICAS
     ========================= */
  actualizarEstadisticas(): void {
    if (this.filteredMetrics.length === 0) {
      this.resetEstadisticas();
      return;
    }

    const suma = this.filteredMetrics.reduce(
      (acc, item) => acc + item.puntuacion,
      0
    );

    this.promedioPuntuacion = parseFloat(
      (suma / this.filteredMetrics.length).toFixed(2)
    );

    const mejor = this.filteredMetrics.reduce((a, b) =>
      b.puntuacion > a.puntuacion ? b : a
    );

    this.mejorEquipo = mejor.equipo;
  }

  private resetEstadisticas(): void {
    this.promedioPuntuacion = 0;
    this.mejorEquipo = '—';
    this.ultimaFecha = '—';
  }

  /* =========================
     NAVEGACIÓN
     ========================= */
  volverAlInicio(): void {
    this.router.navigate(['/']);
  }

  verDetalle(m: Metric): void {
    this.router.navigate(['/detalle', m.equipo], {
      state: { data: m }
    });
  }
}
