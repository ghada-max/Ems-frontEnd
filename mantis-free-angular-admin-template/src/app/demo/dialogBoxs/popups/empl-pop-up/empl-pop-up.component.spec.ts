import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplPopUpComponent } from './empl-pop-up.component';

describe('EmplPopUpComponent', () => {
  let component: EmplPopUpComponent;
  let fixture: ComponentFixture<EmplPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmplPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
