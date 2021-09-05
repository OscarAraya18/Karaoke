import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPopupComponent } from './editar-popup.component';

describe('EditarPopupComponent', () => {
  let component: EditarPopupComponent;
  let fixture: ComponentFixture<EditarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
