import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarVisitasTecnicoComponent } from './consultar-visitas-tecnico.component';

describe('ConsultarVisitasTecnicoComponent', () => {
  let component: ConsultarVisitasTecnicoComponent;
  let fixture: ComponentFixture<ConsultarVisitasTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarVisitasTecnicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarVisitasTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
