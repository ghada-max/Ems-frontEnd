import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplBoxComponent } from './empl-box.component';

describe('EmplBoxComponent', () => {
  let component: EmplBoxComponent;
  let fixture: ComponentFixture<EmplBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmplBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
