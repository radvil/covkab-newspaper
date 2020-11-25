import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { DataService, IArticle } from '../../_core';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  isHeading = true;
  isSubheading = true;
  articles: IArticle[];
  isLoading = false;
  private subs = new Subscription();
  public articleImageLink: string;

  constructor(private dataSrv: DataService, private router: Router) {}

  ngOnInit() {
    this.subs.add(this.loadArticles());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadArticles() {
    this.isLoading = true;
    this.dataSrv.getArticles().subscribe((result: IArticle[]) => {
      this.articles = result;

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  showDetail(id: string) {
    this.router.navigate([`article/${id}`]);
  }
}
