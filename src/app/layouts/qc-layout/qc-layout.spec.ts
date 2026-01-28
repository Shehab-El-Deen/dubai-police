import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcLayout } from './qc-layout';

describe('QcLayout', () => {
  let component: QcLayout;
  let fixture: ComponentFixture<QcLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
