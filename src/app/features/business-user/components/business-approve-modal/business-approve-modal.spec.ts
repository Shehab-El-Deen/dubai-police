import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessApproveModal } from './business-approve-modal';

describe('BusinessApproveModal', () => {
  let component: BusinessApproveModal;
  let fixture: ComponentFixture<BusinessApproveModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessApproveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessApproveModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
