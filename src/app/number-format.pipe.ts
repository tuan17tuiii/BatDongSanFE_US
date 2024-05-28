import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + ' tỷ';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + ' triệu';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'k';
    } else {
      return value.toString();
    }
  }
}
