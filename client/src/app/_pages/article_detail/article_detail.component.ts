import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DataService, IArticle } from '../../_core';

@Component({
  selector: 'app-article_detail',
  templateUrl: './article_detail.component.html',
  styleUrls: ['./article_detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

  public article: IArticle;
  public loading = false;
  public avatarPlaceholder = 'assets/avatars/default.jpg';
  public articleImageLink: string;
  
  private idParam = "";
  private subs: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private dataSrv: DataService) {
    this.idParam = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.subs.add(this.loadArticle());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private loadArticle(): void {
    this.loading = true;

    const http$ = this.dataSrv.getArticle(this.idParam).pipe(
      tap((article) => {
        this.article = article;
        setTimeout(() => this.loading = false, 1000);
      }));
      
    this.subs.add(http$.subscribe());
  }
}
