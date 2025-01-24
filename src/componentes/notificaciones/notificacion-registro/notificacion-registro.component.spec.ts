import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionRegistroComponent } from './notificacion-registro.component';

describe('NotificacionRegistroComponent', () => {
  let component: NotificacionRegistroComponent;
  let fixture: ComponentFixture<NotificacionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
