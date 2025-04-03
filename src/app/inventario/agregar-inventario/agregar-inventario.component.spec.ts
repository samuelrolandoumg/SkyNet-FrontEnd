import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInventarioComponent } from './agregar-inventario.component';

describe('AgregarInventarioComponent', () => {
  let component: AgregarInventarioComponent;
  let fixture: ComponentFixture<AgregarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
