import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface CategoriaDetalle {
  nombre: string;
  icon: string;
  valor: number;
  descripcion: string;
  metricas: [string, number][];
}

@Component({
  standalone: true,
  selector: 'app-detalle-calificacion',
  imports: [CommonModule],
  templateUrl: './detalle-calificacion.component.html'
})
export class DetalleCalificacionComponent {

  equipo = '';
  detalle: any;

  promedioGeneral = 0;

  categorias: CategoriaDetalle[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {

    this.equipo = this.route.snapshot.paramMap.get('equipo') ?? '';

    this.http.get(`http://localhost:3000/api/metrics/${this.equipo}`)
      .subscribe((resp: any) => {

        this.detalle = resp.detalle;

        const manual = this.promedio(this.detalle.manual);
        const automat = this.promedio(this.detalle.automatizacion);
        const pipes = this.promedio(this.detalle.pipelines);

        this.promedioGeneral = (manual + automat + pipes) / 3;

        this.categorias = [
          {
            nombre: "Pruebas Manuales",
            icon: "M",
            valor: manual,
            descripcion:
              "Basado en métricas como resolución y detección de defectos, cumplimiento de gherkin y cobertura de pruebas.",
            metricas: this.detalle.manual
          },
          {
            nombre: "Automatización",
            icon: "A",
            valor: automat,
            descripcion:
              "Considera uso de GitHub, salud del código de automatización, ejecución de tests y efectividad de automatización.",
            metricas: this.detalle.automatizacion
          },
          {
            nombre: "Pipelines",
            icon: "P",
            valor: pipes,
            descripcion:
              "Mide la adopción y madurez de los pipelines de testing dentro del equipo.",
            metricas: this.detalle.pipelines
          }
        ];
      });
  }

  /** Calcula el promedio de una lista de métricas [nombre, valor] */
  promedio(lista: [string, number][]): number {
    if (!lista || lista.length === 0) return 0;
    const sum = lista.reduce((acc, item) => acc + item[1], 0);
    return sum / lista.length;
  }

  /** Gradiente principal de la barra, tipo Grafana */
  getGradient(valor: number): string {
    if (valor < 40) return "linear-gradient(to right, #EF4444, #F97316)";
    if (valor < 70) return "linear-gradient(to right, #EAB308, #FACC15)";
    return "linear-gradient(to right, #22C55E, #A3E635)";
  }

  /** Glow de la barra */
  getShadow(valor: number): string {
    if (valor < 40) return "0 0 18px rgba(239,68,68,0.55)";
    if (valor < 70) return "0 0 18px rgba(234,179,8,0.55)";
    return "0 0 20px rgba(34,197,94,0.65)";
  }

  /** Color del texto del porcentaje */
  getTextColor(valor: number): string {
    if (valor < 40) return "#F97316"; // naranja/rojo
    if (valor < 70) return "#FACC15"; // amarillo
    return "#4ADE80"; // verde
  }

  /** Label de estado */
  getStatusLabel(valor: number): string {
    if (valor < 40) return "Crítico";
    if (valor < 70) return "En riesgo";
    if (valor < 85) return "Aceptable";
    return "Excelente";
  }

  /** Clases tailwind dinámicas para el pill de estado */
  getStatusClass(valor: number): string {
    if (valor < 40) {
      return "bg-red-500/10 text-red-300 border-red-500/40";
    }
    if (valor < 70) {
      return "bg-amber-500/10 text-amber-300 border-amber-500/40";
    }
    if (valor < 85) {
      return "bg-sky-500/10 text-sky-300 border-sky-500/40";
    }
    return "bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
  }

  /** Altura de las barritas del sparkline */
  getBarHeight(valor: number): number {
    // Normaliza entre 20% y 100% para que no queden barras invisibles
    const height = Math.max(20, Math.min(100, valor));
    return height;
  }

  /** Color de cada barrita del sparkline */
  getSparkColor(valor: number): string {
    if (valor < 40) return "linear-gradient(to top, #B91C1C, #F97316)";
    if (valor < 70) return "linear-gradient(to top, #B45309, #FACC15)";
    return "linear-gradient(to top, #15803D, #4ADE80)";
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}
