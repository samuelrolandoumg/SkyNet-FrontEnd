import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFarmaciasComponent } from './listar-farmacias.component';

describe('ListarFarmaciasComponent', () => {
  let component: ListarFarmaciasComponent;
  let fixture: ComponentFixture<ListarFarmaciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarFarmaciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarFarmaciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
