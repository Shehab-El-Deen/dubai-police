import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewSidebar } from './admin-review-sidebar';

describe('AdminReviewSidebar', () => {
  let component: AdminReviewSidebar;
  let fixture: ComponentFixture<AdminReviewSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReviewSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReviewSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
