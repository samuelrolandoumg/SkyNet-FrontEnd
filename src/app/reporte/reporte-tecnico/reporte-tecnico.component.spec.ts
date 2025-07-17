import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTecnicoComponent } from './reporte-tecnico.component';

describe('ReporteTecnicoComponent', () => {
  let component: ReporteTecnicoComponent;
  let fixture: ComponentFixture<ReporteTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteTecnicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
