import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IArticle } from './article.interface';
import { ArticleService } from './article.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';
import { imageExists } from '../../_shared/utils/checkImageExistence';

import { transformArticleData } from '../../_shared';

export class ArticleDataSource implements DataSource<IArticle> {
    private articlesSubject = new BehaviorSubject<IArticle[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private articleSrv: ArticleService) { }

    findArticles(
        order: string = null,
        pageIndex: number = 1,
        pageSize: number = 3,
        currSort: string = 'createdAt'
    ) {
        if (order === null || order === '' || currSort === 'createdAt') {
            order === 'asc' ? (currSort = 'createdAt') : (currSort = '-createdAt');
        }
        if (currSort === 'title') {
            order === 'asc' ? (currSort = 'title') : (currSort = '-title');
        }
        if (currSort === 'author') {
            order === 'asc' ? (currSort = 'author') : (currSort = '-author');
        }
        if (currSort === 'isPublished') {
            order === 'asc'
                ? (currSort = 'isPublished')
                : (currSort = '-isPublished');
        }

        this.loadingSubject.next(true);
        const http$ = this.articleSrv.getArticles(currSort, pageIndex, pageSize);

        http$
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((articles) => {
                // articles.forEach((art: IArticle) => transformArticleData(art));
                articles.forEach(article => {
                    const defaultImageLink = env.imageUrl + 'articles/' + article.image;
                    article.image = imageExists(defaultImageLink)
                        ? defaultImageLink
                        : article.imageAlt
                    return article;
                })
                this.articlesSubject.next(articles);
            });
    }

    searchArticle(key: string, value: string) {
        this.loadingSubject.next(true);
        const http$ = this.articleSrv.searchArticle(key, value);

        http$
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((articles) => {
                // articles.forEach((art: IArticle) => transformArticleData(art));
                this.articlesSubject.next(articles);
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<IArticle[]> {
        // console.log('Connecting data source');
        return this.articlesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.articlesSubject.complete();
        this.loadingSubject.complete();
    }
}
