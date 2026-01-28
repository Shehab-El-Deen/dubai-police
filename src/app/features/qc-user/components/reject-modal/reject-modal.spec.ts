import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectModal } from './reject-modal';

describe('RejectModal', () => {
  let component: RejectModal;
  let fixture: ComponentFixture<RejectModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
