import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicionesHistorialPage } from './mediciones-historial.page';

describe('MedicionesHistorialPage', () => {
  let component: MedicionesHistorialPage;
  let fixture: ComponentFixture<MedicionesHistorialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicionesHistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
