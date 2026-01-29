import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSubmitRequest } from './business-submit-request';

describe('BusinessSubmitRequest', () => {
  let component: BusinessSubmitRequest;
  let fixture: ComponentFixture<BusinessSubmitRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessSubmitRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessSubmitRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
