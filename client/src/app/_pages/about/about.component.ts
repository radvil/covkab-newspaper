import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { DataService, IAbout, IContact } from '../../_core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  isHeading = true;
  isSubheading = true;
  about$: Observable<IAbout>;
  contact$: Observable<IContact>;
  subs: Subscription = new Subscription();

  constructor(private dataSrv: DataService) {}

  ngOnInit() {
    this.subs.add(this.loadAbout());
    this.subs.add(this.loadContact());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadAbout() {
    this.about$ = this.dataSrv.getAbout();
  }

  loadContact() {
    this.contact$ = this.dataSrv.getContact();
  }
}
