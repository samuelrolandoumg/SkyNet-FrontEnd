import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesVisitaComponent } from './detalles-visita.component';

describe('DetallesVisitaComponent', () => {
  let component: DetallesVisitaComponent;
  let fixture: ComponentFixture<DetallesVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesVisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
