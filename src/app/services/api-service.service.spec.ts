import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RawPatientData } from '../models/patient';
import { environment } from '../../environments/environment';
import * as patientData from './../../assets/patient.json'

import { ApiService } from './api-service.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const mockData: RawPatientData = patientData['default'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve patients from the API', () => {

    httpClient.get<RawPatientData>(environment.queryURI + '/Patient')
    .subscribe(data =>
      expect(data.entry.length).toEqual(mockData.entry.length)
    );
    
    const request = httpMock.expectOne(environment.queryURI + '/Patient');

    expect(request.request.method).toBe('GET');
    
    request.flush(mockData);
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
