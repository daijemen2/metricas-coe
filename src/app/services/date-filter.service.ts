import { Injectable } from '@angular/core';
import { DateFilterValue } from '../dashboard/date-filter/date-filter.component';



/* =========================
   MODELO DE REGISTRO FECHADO
   (mock Dynamo / futuro real)
   ========================= */
export interface RecordWithDate {
  createdAt: string; // ISO string: '2024-01-15T10:23:00Z'
}

@Injectable({
  providedIn: 'root'
})
export class DateFilterService {

  /**
   * Evalúa si un registro cumple el filtro de fecha
   */
  cumpleFiltroFecha(
    recordDateISO: string,
    filter: DateFilterValue | null
  ): boolean {

    // 🟢 Si no hay filtro → pasa todo
    if (!filter) {
      return true;
    }

    const recordDate = new Date(recordDateISO);
    const today = this.startOfDay(new Date());

    switch (filter.mode) {

      case 'preset':
        return this.evalPreset(recordDate, filter.preset!, today);

      case 'single-day':
        return this.isSameDay(recordDate, new Date(filter.date!));

      default:
        return true;
    }
  }

  /* =========================
     PRESETS
     ========================= */
  private evalPreset(
    recordDate: Date,
    preset: string,
    today: Date
  ): boolean {

    switch (preset) {

      case 'today':
        return this.isSameDay(recordDate, today);

      case 'last7':
        return this.isAfter(recordDate, this.daysAgo(7, today));

      case 'last14':
        return this.isAfter(recordDate, this.daysAgo(14, today));

      case 'last30':
        return this.isAfter(recordDate, this.daysAgo(30, today));

      case 'thisMonth':
        return (
          recordDate.getMonth() === today.getMonth() &&
          recordDate.getFullYear() === today.getFullYear()
        );

      case 'lastMonth': {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        return (
          recordDate.getMonth() === lastMonth.getMonth() &&
          recordDate.getFullYear() === lastMonth.getFullYear()
        );
      }

      case 'all':
        return true;

      default:
        return true;
    }
  }

  /* =========================
     HELPERS DE FECHA
     ========================= */

  private isSameDay(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }

  private isAfter(date: Date, from: Date): boolean {
    return date.getTime() >= from.getTime();
  }

  private daysAgo(days: number, today: Date): Date {
    const d = new Date(today);
    d.setDate(d.getDate() - days);
    return d;
  }

  private startOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}
