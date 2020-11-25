import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientService, IPatient } from '../../../_core';
import { ConfirmDialogComponent as ConfirmDialog } from '../../../_shared';
import { environment as env } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IsLoadingService } from '@service-work/is-loading';

@Component({
  selector: 'app-patients_detail',
  templateUrl: './patients_detail.component.html',
  styleUrls: ['./patients_detail.component.scss'],
})
export class PatientsDetailComponent implements OnInit, OnDestroy {
  idParam: string;
  patient: IPatient;
  imageSrc: string;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private patientSrv: PatientService,
    private router: Router,
    private isLoading: IsLoadingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.idParam = this.route.snapshot.params.id;
    this.loadPatient();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadPatient() {
    const http$ = this.patientSrv.getPatient(this.idParam);
    const newSub = http$.subscribe((res) => {
      this.patient = res['doc'];
      this.imageSrc = env.imageUrl + 'patients/' + this.patient.photo;

      if (!this.patient.photo || this.patient.photo === null) {
        this.imageSrc = 'assets/images/avatars/placeholder.png';
      }
    });

    this.isLoading.add(newSub);
    this.subscription.add(newSub);
  }

  editPatient() {
    this.router.navigate([`patients-edit/${this.patient._id}`]);
  }

  deletePatient(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, { width: '450px' });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return this.snackBar.open('Canceled!', 'close', { duration: 2000 });
      }

      const http$ = this.patientSrv.deletePatient(id);
      const newSub = http$.subscribe((_) => {
        this.snackBar.open('Deleted!', 'Close', { duration: 5000 });
        this.router.navigate(['patients-list/']);
      });

      this.isLoading.add(newSub);
    });
  }
}
