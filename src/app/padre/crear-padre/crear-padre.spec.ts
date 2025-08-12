import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPadre } from './crear-padre';

describe('CrearPadre', () => {
  let component: CrearPadre;
  let fixture: ComponentFixture<CrearPadre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPadre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPadre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
