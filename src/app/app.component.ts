import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
import { PatientData, PatientSearch, PatientTableColumns } from './models/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public patientList: Array<PatientData> = [];
  public headers: any;
  public apiTime: number;
  public searchInput: PatientSearch = new PatientSearch();
  public submitted: boolean = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {

    this.headers = PatientTableColumns;
    this.getPatients();
  }

  private getPatients(search?: PatientSearch): void {
    const startTimer: number = new Date().getTime();
    
    let request: any;
    if (search) {
      request = [] as KeyValue<string, string>[];
      
      if (search.name) {
        request.push({
          key: 'name',
          value: search.name
        });
      }
      if (search.dob) {
        request.push({
          key: 'birthdate',
          value: 'eq' + search.dob.replace(/\//gi,'-')
        });
      }
    }

    // this.apiService.getPatientsByBirthDate('1960-01-01', '1966-01-01').subscribe(
    this.apiService.getPatients(request).subscribe(
      (data: any) => {

        this.apiTime = new Date().getTime() - startTimer;

        this.patientList = this.processResponse(data);

        this.patientList.sort((p1: PatientData, p2: PatientData) => {
          return this.getDateTime(p2.birthDate) - this.getDateTime(p1.birthDate);
        });

        this.submitted = false;
      }
    )
  }

  public onSubmit() {
    this.submitted = true;
    this.getPatients(this.searchInput);
  }

  private getDateTime(dateStr: string): number {
    let date = new Date(dateStr);
    if (date) {
      return date != null ? date.getTime() : 0;
    }
    return 0;
  }

  private processResponse(rawList: any): Array<PatientData> {
    const patients: PatientData[] = [];

    if (rawList?.entry && rawList?.entry.length) {
      rawList?.entry.forEach((rawData: any) => {
        if (rawData.hasOwnProperty('resource')) {
          const res: any = rawData.resource;
          const name: string = this.extractName(res.name);
          const addr: string = this.extractAddress(res.address);
  
          patients.push({
            name: name || '',
            address: addr || '',
            birthDate: res.birthDate || '',
            gender: res.gender || '',
            id: res.id || ''
          });
        }
      });
    }

    return patients;
  }

  private extractName(rawName: any): string {
    let name: string = '';
    if (rawName?.[0]?.given) {
      name = (rawName[0].given as string[]).join(' ');
    }
    return name;
  }

  private extractAddress(rawAddr: any): string {
    let addrTxt: string = '';

    if (rawAddr?.[0]) {

      rawAddr = rawAddr?.[0];
      const addrArray: string[] = [];
      const addrKeys: string[] = ['line', 'city', 'state', 'postalCode']

      Object.keys(rawAddr).forEach((key: string) => {

        if (addrKeys.includes(key) && rawAddr[key]) {
          if (key === 'line') {
            addrArray.push((rawAddr[key] as string[]).join(', '));
            return;
          }
          addrArray.push(rawAddr[key]);
        }
      });

      addrTxt = addrArray.join(', ');
    }

    return addrTxt;
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }
}


