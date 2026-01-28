import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRequestDetailsPage } from './business-request-details-page';

describe('BusinessRequestDetailsPage', () => {
  let component: BusinessRequestDetailsPage;
  let fixture: ComponentFixture<BusinessRequestDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRequestDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessRequestDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
