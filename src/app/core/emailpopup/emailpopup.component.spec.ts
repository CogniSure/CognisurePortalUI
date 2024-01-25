import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailpopupComponent } from './emailpopup.component';

describe('EmailpopupComponent', () => {
  let component: EmailpopupComponent;
  let fixture: ComponentFixture<EmailpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
