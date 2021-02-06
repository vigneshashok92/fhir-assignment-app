import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';
import { TimerPipe } from './pipes/timer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { AppRoutingModule } from './app-routing.module';
import { PatientTableComponent } from './components/patient-table/patient-table.component';
import { QuestionnaireGroupComponent } from './components/questionnaire/questionnaire-group/questionnaire-group.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerPipe,
    QuestionnaireComponent,
    PatientTableComponent,
    QuestionnaireGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
