import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePopUpsComponent } from './simple-pop-ups.component';

describe('SimplePopUpsComponent', () => {
  let component: SimplePopUpsComponent;
  let fixture: ComponentFixture<SimplePopUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimplePopUpsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplePopUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
