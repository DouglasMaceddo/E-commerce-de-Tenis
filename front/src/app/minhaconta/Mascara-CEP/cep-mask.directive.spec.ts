import { CepMaskDirective } from './cep-mask.directive';
import { ElementRef } from '@angular/core';

describe('CepMaskDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('input') };
    const directive = new CepMaskDirective(elementRefMock as ElementRef);
    expect(directive).toBeTruthy();
  });
});

