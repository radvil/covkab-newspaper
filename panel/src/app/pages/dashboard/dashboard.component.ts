import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { IsLoadingService } from '@service-work/is-loading';

import { environment as env } from '../../../environments/environment';
import { makeStatsArray } from './stats_boxes/makeStatsArray';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  baseUrl: string = env.apiUrl;
  subscription: Subscription = new Subscription();
  stats: any = [];

  constructor(private http: HttpClient, private isLoading: IsLoadingService) {}

  ngOnInit() {
    this.getTotals();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTotals() {
    const http$ = this.http.get(this.baseUrl + 'statistics');
    const newSub = http$.subscribe((res) => {
      this.stats = makeStatsArray(res['doc']);
    });

    this.isLoading.add(newSub);
    this.subscription.add(newSub);
  }
}
