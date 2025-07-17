import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSupervisorComponent } from './reporte-supervisor.component';

describe('ReporteSupervisorComponent', () => {
  let component: ReporteSupervisorComponent;
  let fixture: ComponentFixture<ReporteSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteSupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
