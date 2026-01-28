import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRequestDetailModal } from './business-request-detail-modal';

describe('BusinessRequestDetailModal', () => {
  let component: BusinessRequestDetailModal;
  let fixture: ComponentFixture<BusinessRequestDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRequestDetailModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessRequestDetailModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
