import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhacontaPage } from './minhaconta.page';

describe('MinhacontaPage', () => {
  let component: MinhacontaPage;
  let fixture: ComponentFixture<MinhacontaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhacontaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
