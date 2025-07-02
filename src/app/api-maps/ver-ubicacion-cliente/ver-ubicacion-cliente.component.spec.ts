import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUbicacionClienteComponent } from './ver-ubicacion-cliente.component';

describe('VerUbicacionClienteComponent', () => {
  let component: VerUbicacionClienteComponent;
  let fixture: ComponentFixture<VerUbicacionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerUbicacionClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerUbicacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
