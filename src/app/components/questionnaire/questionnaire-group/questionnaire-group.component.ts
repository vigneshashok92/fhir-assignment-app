import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Questionnaire } from 'src/app/models/questionnaire';

@Component({
  selector: 'app-questionnaire-group',
  templateUrl: './questionnaire-group.component.html',
  styleUrls: ['./questionnaire-group.component.scss']
})
export class QuestionnaireGroupComponent implements OnInit {

  @Input()
  public gForm: FormGroup;

  @Input()
  public groupData: Questionnaire[];

  @Input()
  public submitted: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log(this.gForm);
    console.log(this.groupData);
  }

  get fCntrl() { 
    return this.gForm.controls; 
  }

}
