import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFarmaciaComponent } from './editar-farmacia.component';

describe('EditarFarmaciaComponent', () => {
  let component: EditarFarmaciaComponent;
  let fixture: ComponentFixture<EditarFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFarmaciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
