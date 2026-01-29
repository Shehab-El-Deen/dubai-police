import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTeam } from './admin-add-team';

describe('AdminAddTeam', () => {
  let component: AdminAddTeam;
  let fixture: ComponentFixture<AdminAddTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
