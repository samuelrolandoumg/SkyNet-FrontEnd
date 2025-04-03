import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInventarioComponent } from './listar-inventario.component';

describe('ListarInventarioComponent', () => {
  let component: ListarInventarioComponent;
  let fixture: ComponentFixture<ListarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
