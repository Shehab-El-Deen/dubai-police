import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveModal } from './approve-modal';

describe('ApproveModal', () => {
  let component: ApproveModal;
  let fixture: ComponentFixture<ApproveModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
