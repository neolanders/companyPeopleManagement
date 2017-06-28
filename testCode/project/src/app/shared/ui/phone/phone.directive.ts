import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[phone]' })
export class PhoneDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\D+/g, '');
    if (trimmed.length > 10) {
      trimmed = trimmed.substr(0, 10);
    }
    let numbers = [];
    numbers.push(trimmed.substr(0,3));
    if(trimmed.length > 3) {
      numbers.push(trimmed.substr(3, 3));
    }
    if(trimmed.length > 6) {
      numbers.push(trimmed.substr(6));
    }
    input.value = numbers.join('-');
  }
}
