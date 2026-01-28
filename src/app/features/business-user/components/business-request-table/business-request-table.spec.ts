import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRequestTable } from './business-request-table';

describe('BusinessRequestTable', () => {
  let component: BusinessRequestTable;
  let fixture: ComponentFixture<BusinessRequestTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRequestTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessRequestTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
