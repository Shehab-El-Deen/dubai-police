import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOverview } from './business-overview';

describe('BusinessOverview', () => {
  let component: BusinessOverview;
  let fixture: ComponentFixture<BusinessOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
