import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiNoPopupComponent } from './si-no-popup.component';

describe('SiNoPopupComponent', () => {
  let component: SiNoPopupComponent;
  let fixture: ComponentFixture<SiNoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiNoPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiNoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
