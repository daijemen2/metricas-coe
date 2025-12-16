import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/* =========================
   MODELOS
   ========================= */
export type DatePreset =
  | 'today'
  | 'last7'
  | 'last14'
  | 'last30'
  | 'thisMonth'
  | 'lastMonth'
  | 'all';

export interface DateFilterValue {
  mode: 'preset' | 'single-day';
  preset?: DatePreset;
  date?: string;
}

/* =========================
   COMPONENTE
   ========================= */
@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-filter.component.html'
})
export class DateFilterComponent {

  /* =========================
     OUTPUT
     ========================= */
  @Output() dateChange = new EventEmitter<DateFilterValue>();

  /* =========================
     STATE UI
     ========================= */
  selectedPreset = signal<DatePreset | null>(null);
  showSingleDate = signal<boolean>(false);
  activeLabel = signal<string | null>(null);

  /* =========================
     PRESETS
     ========================= */
  presets: { label: string; value: DatePreset }[] = [
    { label: 'Hoy', value: 'today' },
    { label: 'Últimos 7 días', value: 'last7' },
    { label: 'Últimos 14 días', value: 'last14' },
    { label: 'Últimos 30 días', value: 'last30' },
    { label: 'Este mes', value: 'thisMonth' },
    { label: 'Mes anterior', value: 'lastMonth' },
    { label: 'Histórico', value: 'all' }
  ];

  /* =========================
     ACCIONES
     ========================= */

  emitPreset(preset: DatePreset): void {
    this.selectedPreset.set(preset);
    this.showSingleDate.set(false);

    const label =
      this.presets.find(p => p.value === preset)?.label ?? null;

    // Histórico = sin chip visible
    this.activeLabel.set(preset === 'all' ? null : label);

    this.dateChange.emit({
      mode: 'preset',
      preset
    });
  }

  enableSingleDate(): void {
    this.showSingleDate.set(true);
    this.selectedPreset.set(null);
  }

  emitSingleDate(date: string): void {
    if (!date) return;

    this.activeLabel.set(date);

    this.dateChange.emit({
      mode: 'single-day',
      date
    });
  }

  clearDate(): void {
    this.selectedPreset.set(null);
    this.activeLabel.set(null);
    this.showSingleDate.set(false);

    this.dateChange.emit({
      mode: 'preset',
      preset: 'all'
    });
  }
}
