import { TestBed } from '@angular/core/testing';

import { CartaoCreditoService } from './cartao-credito.service';

describe('CartaoCreditoService', () => {
  let service: CartaoCreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartaoCreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
