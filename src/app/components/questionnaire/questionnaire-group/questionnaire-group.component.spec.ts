import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireGroupComponent } from './questionnaire-group.component';

describe('QuestionnaireGroupComponent', () => {
  let component: QuestionnaireGroupComponent;
  let fixture: ComponentFixture<QuestionnaireGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
