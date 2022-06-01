import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCandidateTableComponent } from './dialog-candidate-table.component';

describe('DialogCandidateTableComponent', () => {
  let component: DialogCandidateTableComponent;
  let fixture: ComponentFixture<DialogCandidateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCandidateTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCandidateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
