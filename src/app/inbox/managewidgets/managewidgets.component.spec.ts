import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagewidgetsComponent } from './managewidgets.component';

describe('ManagewidgetsComponent', () => {
  let component: ManagewidgetsComponent;
  let fixture: ComponentFixture<ManagewidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagewidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagewidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
