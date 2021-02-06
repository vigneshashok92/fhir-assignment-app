import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Questionnaire, QuestionnaireResponse, ResponseItem } from 'src/app/models/questionnaire';
import * as data from './../../../assets/questionnaire.json'

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  public questionnaireData: Questionnaire[] = data['default']['item'] as Questionnaire[];
  public qForm: FormGroup = new FormGroup({});
  public submitted: boolean = false;
  public questionnaireResponse: string;

  constructor() { }

  ngOnInit(): void {
    this.initializeForm(this.qForm, this.questionnaireData);
  }

  public initializeForm(formGroup: FormGroup, data: Questionnaire[]): void {
    
    data.forEach((question: Questionnaire) => {
      
      if (question?.type === 'boolean') {
        formGroup.addControl(question.linkId, new FormControl(false));
      }

      if (question?.type === 'string') {
        formGroup.addControl(question.linkId, new FormControl('', [Validators.required]));
      }

      if (question?.type === 'date') {
        formGroup.addControl(question.linkId, new FormControl('', [Validators.required]));
      }

      if (question?.type === 'group') {
        formGroup.addControl(question.linkId, new FormGroup({}));
        this.initializeForm(formGroup.get(question.linkId) as FormGroup, question.item);
      }
    })
  }

  public onSubmit() {
    this.submitted = true;

    if(this.qForm.invalid) {
      return;
    }

    let qResponse: QuestionnaireResponse = {
      identifier: Math.random(),
      status: 'completed',
      item: []
    };

    const qValue: any = this.qForm.value;
    qResponse.item = this.getResponse(qValue);

    this.questionnaireResponse = JSON.stringify(qResponse.item,undefined,2);
  }

  private getResponse(qValue: any): ResponseItem[] {
    
    let qResItem: ResponseItem[] = [];

    Object.keys(qValue).forEach((key: string) => {

      const ques: Questionnaire = this.getQuestionById(key, this.questionnaireData);
      const qText: string = ques?.text;

      if(typeof qValue[key] === 'object') {
        qResItem.push({
          linkId: key,
          text: qText,
          item: this.getResponse(qValue[key])
        });
        return;
      }

      let ansProp: string;

      switch(ques?.type) {
        case 'boolean' : ansProp = 'valueBoolean'; break;
        case 'date' : ansProp = 'valueDate'; break;
        case 'string' : ansProp = 'valueString'; break;
      }

      qResItem.push({
        linkId: key,
        text: qText,
        answer: {
          [ansProp]: qValue[key]
        }
      });
    });

    return qResItem;
  }

  private getQuestionById(id: string, qData: Questionnaire[]): Questionnaire {
    for(let question of qData) {
      if (question.linkId == id) {
        return question;
      } 
      if (question.type === 'group') {
        const ques: Questionnaire = this.getQuestionById(id, question.item);
        if (ques) {
          return ques;
        }
      }
    }
    return;
  }
}
