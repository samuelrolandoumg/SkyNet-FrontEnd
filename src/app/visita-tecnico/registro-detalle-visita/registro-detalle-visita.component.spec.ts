import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDetalleVisitaComponent } from './registro-detalle-visita.component';

describe('RegistroDetalleVisitaComponent', () => {
  let component: RegistroDetalleVisitaComponent;
  let fixture: ComponentFixture<RegistroDetalleVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDetalleVisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDetalleVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
