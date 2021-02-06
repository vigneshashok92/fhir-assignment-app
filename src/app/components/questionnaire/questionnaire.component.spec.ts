import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireComponent } from './questionnaire.component';
import * as data from './../../../assets/questionnaire.json'
import { Questionnaire } from 'src/app/models/questionnaire';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let mockData: Questionnaire[] = data['default']['item'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.qForm.valid).toBeFalsy();
  });

  it('should initialize form', () => {
    component.initializeForm(component.qForm, mockData);
    expect(Object.keys(component.qForm.controls).length).toBeGreaterThanOrEqual(1);
  });
});
