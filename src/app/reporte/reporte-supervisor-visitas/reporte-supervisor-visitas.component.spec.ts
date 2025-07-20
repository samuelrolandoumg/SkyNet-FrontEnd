import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSupervisorVisitasComponent } from './reporte-supervisor-visitas.component';

describe('ReporteSupervisorVisitasComponent', () => {
  let component: ReporteSupervisorVisitasComponent;
  let fixture: ComponentFixture<ReporteSupervisorVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteSupervisorVisitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteSupervisorVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
