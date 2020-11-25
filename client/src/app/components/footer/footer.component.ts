import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { DataService, IAbout, IContact } from '../../_core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  contact$: Observable<IContact>;
  subs: Subscription = new Subscription();

  constructor(private dataSrv: DataService) {}

  ngOnInit(): void {
    this.subs.add(this.loadContact());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadContact() {
    this.contact$ = this.dataSrv.getContact();
  }
}
