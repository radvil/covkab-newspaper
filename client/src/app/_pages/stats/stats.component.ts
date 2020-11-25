import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { CovidIdService } from '../../_core';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {

    public isHeading = true;
    public isSubheading = true;
    public displayedColumns: string[] = [
        'kodeProvi',
        'provinsi',
        'kasusPosi',
        'kasusSemb',
        'kasusMeni',
    ];
    public dailyStat: any;
    public provDataSource: any = [];
    private subs = new Subscription();

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private covidSrv: CovidIdService) { }

    ngOnInit(): void {
        this.subs.add(this.loadAndSetProvinceDataTable());
        this.subs.add(this.loadAndSetDailyCaseData());
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public applyFilterProvince(filterValue: string) {
        this.provDataSource.filter = filterValue.trim().toLowerCase();
    }

    private loadAndSetDailyCaseData(): void {
        this.covidSrv.getDailyStats().subscribe((res) => {
            const totalData = res['data'].length - 1;
            this.dailyStat = res['data'].find((v: any) => v.fid == totalData);
            this.dailyStat.percentHealed = this.dailyStat.persentasePasienSembuh.toFixed(2);
            this.dailyStat.percentDeath = this.dailyStat.persentasePasienMeninggal.toFixed(2);
        });
    }

    private loadAndSetProvinceDataTable(): void {
        this.covidSrv.getStatsPerProv().subscribe((res) => {

            // for some reason we exclude kodeProvi = 0 from the array;
            const provStat = res['data'].filter((x: any) => x.kodeProvi != 0);
            this.provDataSource = new MatTableDataSource(provStat);
            this.provDataSource.sort = this.sort;
        });
    }
}
