import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActividadComponent } from './formulario-actividad.component';

describe('FormularioActividadComponent', () => {
  let component: FormularioActividadComponent;
  let fixture: ComponentFixture<FormularioActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioActividadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
