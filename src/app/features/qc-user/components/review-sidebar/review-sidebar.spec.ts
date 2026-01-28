import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSidebar } from './review-sidebar';

describe('ReviewSidebar', () => {
  let component: ReviewSidebar;
  let fixture: ComponentFixture<ReviewSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
