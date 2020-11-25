import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatient } from './patient.interface';
import { IUser } from '../user/user.interface';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  queryAuthor: string = '';
  _user: IUser;

  constructor(private http: HttpClient, private _auth: AuthService) {
    this._auth.user.subscribe((x) => {
      this._user = x;
      if (this._user.role != 'root') {
        this.queryAuthor = `&field=author&value=${this._user._id}`;
      }
    });
  }

  baseUrl = environment.apiUrl + 'patients';
  patient: IPatient;

  // get documents length
  getDocumentsLength(): Observable<any> {
    return this.http.get(this.baseUrl + '/totalDocuments');
  }

  // create new patient.
  createPatient(patient: IPatient): Observable<any> {
    const fd: any = new FormData();

    fd.append('name', patient.name);
    fd.append('nik', patient.nik);
    fd.append('caseNumber', patient.caseNumber);
    fd.append('status', patient.status);
    fd.append('gender', patient.gender);
    fd.append('phone', patient.phone);
    fd.append('residence', patient.residence);
    fd.append('address', patient.address);
    fd.append('detail', patient.detail);
    fd.append('hasMudik', patient.hasMudik);
    fd.append('author', patient.author);
    fd.append('patientPhoto', patient.patientPhoto);

    return this.http.post<any>(`${this.baseUrl}`, fd);
  }

  // update patient by id.
  updatePatient(id: string, patient: IPatient): Observable<any> {
    const fd: any = new FormData();

    fd.append('name', patient.name);
    fd.append('nik', patient.nik);
    fd.append('caseNumber', patient.caseNumber);
    fd.append('status', patient.status);
    fd.append('gender', patient.gender);
    fd.append('phone', patient.phone);
    fd.append('residence', patient.residence);
    fd.append('address', patient.address);
    fd.append('detail', patient.detail);
    fd.append('hasMudik', patient.hasMudik);
    fd.append('author', patient.author);
    fd.append('patientPhoto', patient.patientPhoto);

    return this.http.put(`${this.baseUrl}/${id}`, fd);
  }

  // delete patient by id.
  deletePatient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // same get all patients (experimental purpose)
  getPatients(
    sort: string,
    pageIndex: number,
    pageSize: number
  ): Observable<IPatient[]> {
    return this.http
      .get(this.baseUrl, {
        params: new HttpParams()
          .set('sort', sort)
          .set('page', pageIndex.toString())
          .set('limit', pageSize.toString()),
      })
      .pipe(map((res) => res['doc']));
  }

  searchPatient(fieldName = 'name', value: string): Observable<IPatient[]> {
    return this.http
      .get(this.baseUrl, {
        params: new HttpParams().set('field', fieldName).set('value', value),
      })
      .pipe(map((res) => res['doc']));
  }

  // get patient by id.
  getPatient(id: string): Observable<IPatient> {
    return this.http.get<IPatient>(`${this.baseUrl}/${id}`);
  }
}
