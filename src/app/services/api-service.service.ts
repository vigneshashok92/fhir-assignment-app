import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { query } from '@angular/animations';
import { KeyValue } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPatients(searchParams?: Array<KeyValue<string, string>>): Observable<Object> {

    if (searchParams) {
      return this.getPatientsByParams(searchParams);
    }
    
    return this.httpClient.get(environment.queryURI + '/Patient',
      { headers: this.getHeaders() });
  }

  getPatientsByBirthDate(minDate?: string, maxDate?: string): Observable<Object> {

    let queryParams: HttpParams = new HttpParams();
    queryParams = queryParams.append('birthdate', 'gt' + minDate);
    queryParams = queryParams.append('birthdate', 'lt' + maxDate);


    return this.httpClient.get(environment.queryURI + '/Patient',
      {
        headers: this.getHeaders(),
        params: queryParams
      });
  }

  getPatientsByParams(searchParams: Array<KeyValue<string, string>>): Observable<Object> {

    let queryParams: HttpParams = new HttpParams();
    searchParams.forEach((keyValue: KeyValue<string, string>) => {
      queryParams = queryParams.append(keyValue.key, keyValue.value);
    });

    return this.httpClient.get(environment.queryURI + '/Patient',
      {
        headers: this.getHeaders(),
        params: queryParams
      });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }
}


