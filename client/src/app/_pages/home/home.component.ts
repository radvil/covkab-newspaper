import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { DataService, CovidIdService } from '../../_core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public isHeading = true;
  public isSubheading = true;
  public error = '';
  public portfolios: any;
  public stat: any;
  public totalDeath: number;
  public totalRecovered: number;
  public totalOnRecovery: number;
  public totalCases: number;
  public isLoading = false;

  private subs = new Subscription();

  constructor(
    private dataSrv: DataService,
    private covidSrv: CovidIdService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subs.add(this.loadPortfolios());
    this.subs.add(this.loadStats());

    this.subs.add(this.loadCovidCurrentStats());
  }

  private loadCovidCurrentStats(): void {
    const http$ = this.covidSrv.getCurrentStats();
    http$.subscribe((res) => {
      this.totalDeath = res['meninggal'];
      this.totalRecovered = res['sembuh'];
      this.totalOnRecovery = res['perawatan'];
      this.totalCases = res['jumlahKasus'];
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private loadPortfolios(): void {
    this.isLoading = true;
    this.dataSrv.getPortfolios().subscribe(
      (res) => (this.portfolios = res, this.isLoading = false),
      (err) => {
        this.error = err;
        this.snackBar.open(this.error, 'close', { duration: 5000 });
      }
    );
  }

  private loadStats(): void {
    this.dataSrv.getLocalCovidCaseStatus().subscribe(
      (res) => (this.stat = res['doc']),
      (err) => {
        this.error = err;
        this.snackBar.open(this.error, 'close', { duration: 5000 });
      }
    );
  }
}
