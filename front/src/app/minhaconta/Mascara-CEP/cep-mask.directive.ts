import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCepMask]',
  standalone: true
})
export class CepMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let input = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (input.length > 5) {
      input = `${input.slice(0, 5)}-${input.slice(5, 8)}`; // Adiciona o hífen
    }
    this.el.nativeElement.value = input;
  }
}
