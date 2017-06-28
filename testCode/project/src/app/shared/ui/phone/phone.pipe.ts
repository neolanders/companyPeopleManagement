import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let trimmed = value.replace(/\D+/g, '');
    if (trimmed.length > 10) {
      trimmed = trimmed.substr(0, 10);
    }
    const numbers = [];
    numbers.push(trimmed.substr(0, 3));
    if (trimmed.length > 3) {
      numbers.push(trimmed.substr(3, 3));
    }
    if (trimmed.length > 6) {
      numbers.push(trimmed.substr(6));
    }
    return numbers.join('-');
  }
}
