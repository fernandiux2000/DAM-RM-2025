import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porcentaje',
  standalone: true,
})
export class PorcentajePipe implements PipeTransform {
  transform(value: string | number | undefined | null): string {
    if (value === undefined || value === null || value === '') {
      return 'N/A';
    }
    return `${value}%`;
  }
}