import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarVisitasComponent } from './consultar-visitas.component';

describe('ConsultarVisitasComponent', () => {
  let component: ConsultarVisitasComponent;
  let fixture: ComponentFixture<ConsultarVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarVisitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
