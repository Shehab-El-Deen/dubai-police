import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcOverview } from './qc-overview';

describe('QcOverview', () => {
  let component: QcOverview;
  let fixture: ComponentFixture<QcOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QcOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QcOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
