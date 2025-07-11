import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarVisitasSupervisorComponent } from './consultar-visitas-supervisor.component';

describe('ConsultarVisitasSupervisorComponent', () => {
  let component: ConsultarVisitasSupervisorComponent;
  let fixture: ComponentFixture<ConsultarVisitasSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarVisitasSupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarVisitasSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
