import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientService } from './patient.service';

@Injectable()
export class PatientResolver implements Resolve<any> {
  constructor(private patientService: PatientService) {}

  resolve(): Observable<any> {
    return this.patientService.getDocumentsLength();
  }
}
