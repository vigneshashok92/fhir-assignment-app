import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api-service.service';

import { PatientTableComponent } from './patient-table.component';
import * as patientData from './../../../assets/patient.json'
import { RawPatientData } from 'src/app/models/patient';
import { FormsModule } from '@angular/forms';
import { TimerPipe } from 'src/app/pipes/timer';


describe('PatientTableComponent', () => {
  let component: PatientTableComponent;
  let fixture: ComponentFixture<PatientTableComponent>;

  const mockData: RawPatientData = patientData['default'];
  let getPatientsSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTableComponent, TimerPipe ],
      imports: [FormsModule],
      providers: [
        {provide: ApiService, useValue: {
          getPatients: () => of(mockData)
        }}
      ]
    })
    .compileComponents();

    const apiService = jasmine.createSpyObj('ApiService', ['getPatients']);
    getPatientsSpy = apiService.getPatients.and.returnValue(of(mockData));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patient data', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.patientList.length).toBeGreaterThan(0);
  });
});
