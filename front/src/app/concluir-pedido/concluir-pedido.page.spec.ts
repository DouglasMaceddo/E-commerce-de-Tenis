import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcluirPedidoPage } from './concluir-pedido.page';

describe('ConcluirPedidoPage', () => {
  let component: ConcluirPedidoPage;
  let fixture: ComponentFixture<ConcluirPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcluirPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
