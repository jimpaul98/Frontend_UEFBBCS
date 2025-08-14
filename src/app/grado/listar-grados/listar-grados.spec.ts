import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarGrados } from './listar-grados';

describe('ListarGrados', () => {
  let component: ListarGrados;
  let fixture: ComponentFixture<ListarGrados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarGrados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarGrados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
