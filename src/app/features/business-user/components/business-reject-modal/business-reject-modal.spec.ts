import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRejectModal } from './business-reject-modal';

describe('BusinessRejectModal', () => {
  let component: BusinessRejectModal;
  let fixture: ComponentFixture<BusinessRejectModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRejectModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessRejectModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
