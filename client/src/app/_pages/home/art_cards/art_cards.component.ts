import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { DataService, IArticle } from '../../../_core';

@Component({
  selector: 'app-art_cards',
  templateUrl: './art_cards.component.html',
  styleUrls: ['./art_cards.component.scss'],
})
export class ArtCardsComponent implements OnInit {
  isHeading = true;
  isSubheading = true;
  articles: IArticle[];
  private subs = new Subscription();

  constructor(private dataSrv: DataService, private router: Router) {}

  ngOnInit() {
    this.loadArticles();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadArticles() {
    this.dataSrv.getArticles().subscribe((res) => (this.articles = res));
  }

  showDetail(id: string) {
    this.router.navigate([`article/${id}`]);
  }

  showMore() {
    this.router.navigate(['articles']);
  }
}
