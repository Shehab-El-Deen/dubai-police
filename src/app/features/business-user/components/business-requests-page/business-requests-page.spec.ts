import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRequestsPage } from './business-requests-page';

describe('BusinessRequestsPage', () => {
  let component: BusinessRequestsPage;
  let fixture: ComponentFixture<BusinessRequestsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRequestsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
