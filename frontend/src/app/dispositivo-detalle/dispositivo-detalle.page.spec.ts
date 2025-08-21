import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispositivoDetallePage } from './dispositivo-detalle.page';

describe('DispositivoDetallePage', () => {
  let component: DispositivoDetallePage;
  let fixture: ComponentFixture<DispositivoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
