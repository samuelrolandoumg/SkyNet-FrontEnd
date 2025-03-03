import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCcComponent } from './listar-cc.component';

describe('ListarCcComponent', () => {
  let component: ListarCcComponent;
  let fixture: ComponentFixture<ListarCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
