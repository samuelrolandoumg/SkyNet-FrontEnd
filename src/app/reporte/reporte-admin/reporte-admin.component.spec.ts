import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAdminComponent } from './reporte-admin.component';

describe('ReporteAdminComponent', () => {
  let component: ReporteAdminComponent;
  let fixture: ComponentFixture<ReporteAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
