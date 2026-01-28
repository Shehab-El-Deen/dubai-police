import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessReviewSidebar } from './business-review-sidebar';

describe('BusinessReviewSidebar', () => {
  let component: BusinessReviewSidebar;
  let fixture: ComponentFixture<BusinessReviewSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessReviewSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessReviewSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
