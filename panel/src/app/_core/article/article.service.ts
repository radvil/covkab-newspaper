import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticle } from './article.interface';
import { IUser } from '../user/user.interface';
// circular dependecies? should make index.ts for each folder;
import { AuthService } from '../auth/auth.service';
import { environment as env } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { imageExists } from '../../_shared/utils/checkImageExistence';

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    queryAuthor: string = '';
    _user: IUser;

    constructor(private http: HttpClient, private _auth: AuthService) {
        this._auth.user.subscribe((x) => {
            this._user = x;
            if (this._user.role != 'root') {
                this.queryAuthor = `&field=author&value=${this._user._id}`;
            }
        });
    }

    baseUrl = env.apiUrl + 'articles';
    article: IArticle;

    // get documents length
    getDocumentsLength(): Observable<any> {
        return this.http.get(this.baseUrl + '/totalDocuments');
    }

    // create new article.
    createArticle(article: IArticle): Observable<any> {
        const fd: any = new FormData();
        fd.append('title', article.title);
        fd.append('content', article.content);
        fd.append('author', article.author);
        fd.append('isPublished', article.isPublished);
        fd.append('articleImage', article.articleImage);
        fd.append('imageAlt', article.imageAlt);

        return this.http.post<any>(`${this.baseUrl}`, fd);
    }

    // update article by id.
    updateArticle(id: string, article: IArticle): Observable<any> {
        const fd: any = new FormData();
        fd.append('title', article.title);
        fd.append('content', article.content);
        fd.append('author', article.author);
        fd.append('isPublished', article.isPublished);
        fd.append('articleImage', article.articleImage);
        fd.append('imageAlt', article.imageAlt);

        return this.http.put(`${this.baseUrl}/${id}`, fd);
    }

    // delete article by id.
    deleteArticle(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }

    // get all queried articles
    getArticles(
        sort: string,
        pageIndex: number,
        pageSize: number
    ): Observable<IArticle[]> {
        return this.http
            .get(this.baseUrl, {
                params: new HttpParams()
                    .set('sort', sort)
                    .set('page', pageIndex.toString())
                    .set('limit', pageSize.toString()),
            })
            .pipe(
                map((res) => res['doc']),
            );
    }

    searchArticle(fieldName = 'title', value: string): Observable<IArticle[]> {
        return this.http
            .get(this.baseUrl, {
                params: new HttpParams().set('field', fieldName).set('value', value),
            })
            .pipe(
                map((res) => res['doc']),
                tap((articles: IArticle[]) => {
                    return articles.forEach(article => {
                        const defaultImageLink = env.imageUrl + 'articles/' + article.image;
                        article.image = imageExists(defaultImageLink)
                            ? defaultImageLink
                            : article.imageAlt
                        return article;
                    })
                })
            );
    }

    // get article by id.
    getArticle(id: string): Observable<IArticle> {
        return this.http.get<IArticle>(`${this.baseUrl}/${id}`).pipe(
            map(res => res['doc']),
            tap((article: IArticle) => {
                const defaultImageLink = env.imageUrl + 'articles/' + article.image;
                article.image = imageExists(defaultImageLink)
                    ? defaultImageLink
                    : article.imageAlt;
                return article;
            })
        );
    }
}
