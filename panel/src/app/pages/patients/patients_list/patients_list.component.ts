import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PatientService, PatientDataSource, IPatient } from '../../../_core';
import { ConfirmDialogComponent as ConfirmDialog } from '../../../_shared';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IsLoadingService } from '@service-work/is-loading';
import { merge, Observable, fromEvent, of, from } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-patients_list',
  templateUrl: './patients_list.component.html',
  styleUrls: ['./patients_list.component.scss'],
})
export class PatientsListComponent implements OnInit, AfterViewInit {
  dataSource: PatientDataSource;
  displayedColumns: string[] = [
    'name',
    'residence',
    'gender',
    'status',
    'action',
  ];
  totalDocuments: number;
  isDocumentsNull: Observable<boolean>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(
    private patientSrv: PatientService,
    private isLoading: IsLoadingService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.totalDocuments = this.route.snapshot.data['totalDocuments'];
    this.isDocumentsNull = this.totalDocuments['message'];
    this.dataSource = new PatientDataSource(this.patientSrv);
    this.dataSource.findPatients(null, 1, 5, 'createdAt');
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // load patients on filter
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadPatientsPage('name');
        })
      )
      .subscribe();

    // load patients on sort || change page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadPatientsPage()))
      .subscribe();
  }

  loadPatientsPage(key?: string) {
    key
      ? this.dataSource.searchPatient(key, this.input.nativeElement.value)
      : this.dataSource.findPatients(
          this.sort.direction,
          this.paginator.pageIndex + 1,
          this.paginator.pageSize,
          this.sort.active
        );
  }

  addPatient() {
    this.router.navigate(['patients-add/']);
  }

  showPatient(id: string) {
    this.router.navigate([`patients-detail/${id}`]);
  }

  editPatient(id: string) {
    this.router.navigate([`patients-edit/${id}`]);
  }

  deletePatient(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, { width: '450px' });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.snackBar.open('Canceled!', 'close', { duration: 2000 });
      }

      const http$ = this.patientSrv.deletePatient(id);
      const obs = http$.subscribe(
        (_) => {
          this.snackBar.open('Deleted!', 'close', { duration: 5000 });
          this.loadPatientsPage();
        },
        (err) => {
          this.snackBar.open('Failed!', 'close', { duration: 2000 });
        }
      );

      this.isLoading.add(obs);
    });
  }
}
