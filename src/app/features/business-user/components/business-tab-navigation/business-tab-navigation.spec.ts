import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTabNavigation } from './business-tab-navigation';

describe('BusinessTabNavigation', () => {
  let component: BusinessTabNavigation;
  let fixture: ComponentFixture<BusinessTabNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTabNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessTabNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
