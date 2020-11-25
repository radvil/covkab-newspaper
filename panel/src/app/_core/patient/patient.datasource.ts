import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IPatient } from './patient.interface';
import { PatientService } from './patient.service';
import { catchError, finalize } from 'rxjs/operators';

export class PatientDataSource implements DataSource<IPatient> {
  private patientsSubject = new BehaviorSubject<IPatient[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private patientSrv: PatientService) {}

  findPatients(
    order: string = null,
    pageIndex: number = 1,
    pageSize: number = 3,
    currSort: string = 'createdAt'
  ) {
    if (currSort === 'name') {
      order === 'asc' ? (currSort = 'name') : (currSort = '-name');
    }
    if (currSort === 'residence') {
      order === 'asc' ? (currSort = 'residence') : (currSort = '-residence');
    }
    if (currSort === 'gender') {
      order === 'asc' ? (currSort = 'gender') : (currSort = '-gender');
    }
    if (currSort === 'status') {
      order === 'asc' ? (currSort = 'status') : (currSort = '-status');
    }

    this.loadingSubject.next(true);
    this.patientSrv
      .getPatients(currSort, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((patients) => this.patientsSubject.next(patients));
  }

  searchPatient(key: string, value: string) {
    this.loadingSubject.next(true);
    this.patientSrv
      .searchPatient(key, value)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((patients) => this.patientsSubject.next(patients));
  }

  connect(collectionViewer: CollectionViewer): Observable<IPatient[]> {
    // console.log('Connecting data source');
    return this.patientsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.patientsSubject.complete();
    this.loadingSubject.complete();
  }
}
