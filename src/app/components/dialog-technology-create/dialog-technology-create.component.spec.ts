import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTechnologyCreateComponent } from './dialog-technology-create.component';

describe('DialogTechnologyCreateComponent', () => {
  let component: DialogTechnologyCreateComponent;
  let fixture: ComponentFixture<DialogTechnologyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTechnologyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTechnologyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
