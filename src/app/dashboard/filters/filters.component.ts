import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateFilterValue } from '../date-filter/date-filter.component';
import { DateFilterComponent } from '../date-filter/date-filter.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, DateFilterComponent],
  templateUrl: './filters.component.html'
})
export class FiltersComponent {

  @Input() tribus: string[] = [];
  @Input() coes: string[] = [];
  @Output() filterChange = new EventEmitter<any>();

  selectedTribu = '';
  selectedCoe = '';
  search = '';

  dateFilter: DateFilterValue | null = null;
  usuarioInteraccion = false;

  aplicarFiltros() {
    this.usuarioInteraccion = true;
    this.emitir();
  }

  onDateChange(value: DateFilterValue) {
    this.usuarioInteraccion = true;
    this.dateFilter = value;
    this.emitir();
  }

    private emitir() {
      let activo = false;

    // 🔹 SOLO depende de si el usuario ya interactuó
    if (this.usuarioInteraccion) {
      activo = true;
    }

    const filtros = {
      tribu: this.selectedTribu,
      coe: this.selectedCoe,
      search: this.search,
      date: this.dateFilter,
      activo
    };

    this.filterChange.emit(filtros);
  }
}
