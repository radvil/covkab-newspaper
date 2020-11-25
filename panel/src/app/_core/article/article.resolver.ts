import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from './article.service';

@Injectable()
export class ArticleResolver implements Resolve<any> {
  constructor(private articleService: ArticleService) {}

  resolve(): Observable<any> {
    return this.articleService.getDocumentsLength();
  }
}
